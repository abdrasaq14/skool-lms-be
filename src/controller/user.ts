import { Request, Response } from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const secret: any = process.env.JWT_SECRET
// Create a User
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

 
    const { firstName, lastName, email, phoneNumber, password, countryOfResidence } = req.body;
    if(!firstName || !lastName || !email || !phoneNumber || !password || !countryOfResidence) return res.status(400).json({ error: "All fields are required" });

    const user = await userRepository.findOneBy({ email });
    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = userRepository.create({ firstName, lastName,  email, phoneNumber, password, countryOfResidence });

    const savedUser = await userRepository.save(newUser);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: "Email and password are required" });
    

    const user = await userRepository.findOneBy({ email, password });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: 'User logged in successfully', token});
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPasswordUser = async (req: Request, res: Response) => {
  // console.log('Request received:', req.method, req.url, req.body);
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { email } = req.body

    // console.log('Input Email:', email);
    const user = await userRepository.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000);

    await userRepository.save(user);

   
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_SMP_USERNAME, 
        pass: process.env.GMAIL_SMP_PASSWORD, 
      },
    });

    
    const mailOptions = {
      from:  process.env.GMAIL_SMP_USERNAME,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://link/resetPassword/${resetToken}`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending reset email' });
      } else {
        console.log('Reset email sent:', info.response);
        res.status(200).json({ message: 'Reset link sent to your email' });
      }
    });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




