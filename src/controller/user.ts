import express, { Request, Response } from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import { transporter } from "../utilities/emailsender";

dotenv.config();

const secret: any = process.env.JWT_SECRET;
// Create a User
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      countryOfResidence,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !countryOfResidence
    )
      return res.json({ error: "All fields are required" });

    let user = await userRepository.findOneBy({ email });

    if (user) {
      return res.json({ existingUserError: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        countryOfResidence,
      });

      await userRepository.save(newUser);

      user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.json({ notFoundError: "User not found" });
      }
      else {

      const totpSecret = speakeasy.generateSecret({ length: 20 });

      user.otpSecret = totpSecret.base32;
      user.otp = speakeasy.totp({
        secret: totpSecret.base32,
        encoding: "base32",
      });
      user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await userRepository.save(user); // Save the updated user

      const mailOptions = {
        from: {
          name: "Skool LMS",
          address: "info.skool.lms@gmail.com",
        },
        to: email,
        subject: "Skool LMS - Email Verification",
        text: `TOTP: ${user.otp}`,
        html: `<h3>Hi there,
        Thank you for signing up to Skool LMS. Copy the OTP below to verify your email:</h3>
        <h1>${user.otp}</h1>
        <h3>This OTP will expire in 10 minutes. If you did not sign up for a Skool LMS account,
        you can safely ignore this email. <br>
        <br>
        Best, <br>
        The Skool LMS Team</h3>`,
      };
      await transporter.sendMail(mailOptions);
      res.json({ successfulSignup: "Student signup successful" });
    }}
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ error: "Email and password are required" });

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.json({ error: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.json({
          error: "Invalid password",
        });
      } else {
        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: "1h",
        });

        res.json({ message: "User logged in successfully", token });
      }
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.json({ error: "Internal Server Error" });
  }
};

export const forgotPasswordUser = async (req: Request, res: Response) => {
  // console.log('Request received:', req.method, req.url, req.body);
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { email } = req.body;

    // console.log('Input Email:', email);
    const user = await userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000);

    await userRepository.save(user);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SMP_USERNAME,
        pass: process.env.GMAIL_SMP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_SMP_USERNAME,
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://link/resetPassword/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending reset email" });
      } else {
        console.log("Reset email sent:", info.response);
        res.status(200).json({ message: "Reset link sent to your email" });
      }
    });
  } catch (error) {
    console.error("Error initiating password reset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PASSWORD RESET FUNCTIONALITY

export const resetPassword = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const { email } = req.body;

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpires = new Date(Date.now() + 3600000); 
  await userRepository.save(user);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMP_USERNAME,
      pass: process.env.GMAIL_SMP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_SMP_USERNAME,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({
    message:
      "An email has been sent to the address provided with further instructions.",
  });
};

export const resetPasswordToken = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const { token } = req.params;
  const { password } = req.body;

  const user = await userRepository.findOne({
    where: { resetToken: token },
  });

  if (!user) {
    res
      .status(404)
      .json({ error: "Password reset token is invalid or has expired." });
    return;
  }

  if (
    !user.resetTokenExpires ||
    Date.now() > user.resetTokenExpires.getTime()
  ) {
    res
      .status(401)
      .json({ error: "Password reset token is invalid or has expired." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  user.resetToken = null;
  user.resetTokenExpires = null;
  await userRepository.save(user);

  res.status(200).json({ message: "Your password has been reset!" });
};



export const verifyOTPEmailAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { otp } = req.body;
 
    const userRepository = AppDataSource.getRepository(User);
 
    // Find user by OTP
    const user = await userRepository.findOne({ where: { otp } });
 
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
 
    // Verify OTP
    const verified = speakeasy.totp.verify({
      secret: user.otpSecret,
      encoding: "base32",
      token: otp,
    });
 
    if (Date.now() > user.otpExpiration.getTime()) {
      res.status(400).json({ error: "Invalid or expired OTP" });
      return;
    }
 
    // Clear the OTP from the user record
    user.otp = "";
    user.otpExpiration = new Date(0);
 
    // Add the isVerified property to the user object
    user.isVerified = true;
    await userRepository.save(user);
 
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 