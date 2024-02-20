import { Request, Response } from "express";
import { Customer } from "../entity/user";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";

const secret: any = process.env.JWT_SECRET
// Create a User
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

    const { firstName, lastName, email, phoneNumber, password, countryOfResidence } = req.body;

    const newUser = userRepository.create({ firstName, lastName,  email, phoneNumber, password, countryOfResidence });

    const savedUser = await userRepository.save(newUser);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

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

// Get all Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

    const users = await userRepository.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a User
export const getUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

    const user = await userRepository.findOneBy({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

    const user = await userRepository.findOneBy({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    userRepository.merge(user, req.body);

    const updatedUser = await userRepository.save(user);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Customer);

    const user = await userRepository.findOneBy({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRepository.remove(user);

    res.status(204).json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};