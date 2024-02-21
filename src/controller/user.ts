import { Request, Response } from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret: any = process.env.JWT_SECRET
// Create a User
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

 
    const { firstName, lastName, email, phoneNumber, password, countryOfResidence } = req.body;

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




