import { Request, Response } from "express";
import { User } from "../entity/user";
import { Course } from '../entity/course';
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import { verify } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { transporter } from "../utilities/emailsender";


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
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({ firstName, lastName,  email, phoneNumber, password: hashedPassword, countryOfResidence });

    const savedUser = await userRepository.save(newUser);

    const verifyMail = await transporter.sendMail({
      from: process.env.GMAIL_SMP_USERNAME, 
      to: email, 
      subject: "Activation Link", 
      text: "Hello world?", 
    });

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

export const courseController = async (req: Request, res: Response) => {
  try {
    // Destructure required properties from req.body
    const { courseType, studyMode, courseSearch, entryYear, entryMonth } = req.body;

    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }

    // Verify the token and extract the user ID
    const decodedToken = verify(token, 'your_secret_key');
    const userId = (decodedToken as any).userId; // Assuming the user ID is stored in the token as 'userId'

    // Get repository for User model
    const userRepository = AppDataSource.getRepository(User);
    // Find the user by ID
    const user = await userRepository.findOne(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new instance of Course with provided arguments
    const course = new Course(
      courseType,
      studyMode,
      courseSearch,
      entryYear,
      entryMonth,
      user // Attach the user to the course
    );

    // Get repository for Course model
    const courseRepository = AppDataSource.getRepository(Course);
    // Save the course to the database
    await courseRepository.save(course);

    // Return success response with status code 201
    return res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    // Log the error
    console.error('Error adding course:', error);
    // Return internal server error response with status code 500
    return res.status(500).json({ error: 'unsuccessful' });
  }
};



