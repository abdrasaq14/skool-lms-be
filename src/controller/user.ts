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



// // Get all Users
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const { userId, gender, countryOfBirth, nationality } = req.body;

//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne(userId);

//     if (user) {
//       user.gender = gender;
//       user.countryOfBirth = countryOfBirth;
//       user.nationality = nationality;
//       await userRepository.save(user);
//       res.status(200).json({ message: 'Application stage updated successfully', user });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating application stage:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const qualificationStageController = async (req: Request, res: Response) => {
//   try {
//     const { userId, institutionName, fieldOfStudy, yearOfGraduation, gradeOfCGPA, qualificationType, countryOfInstitution } = req.body;

//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne(userId);

//     if (user) {
//       user.institutionName = institutionName;
//       user.fieldOfStudy = fieldOfStudy;
//       user.yearOfGraduation = yearOfGraduation;
//       user.gradeOfCGPA = gradeOfCGPA; // Change from gradeOfCCGP to gradeOfCGPA
//       user.qualificationType = qualificationType;
//       user.countryOfInstitution = countryOfInstitution;
//       await userRepository.save(user);
//       res.status(200).json({ message: 'Qualification stage updated successfully', user });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating qualification stage:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// export const courseController = async (req: Request, res: Response) => {
//   try {
//     const { userId, courseType, studyMode, courseSearch, entryYear, entryMonth } = req.body;

//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne(userId);

//     if (user) {
//       // Create a new instance of Course using the constructor
//       const course = new Course(courseType, studyMode, courseSearch, entryYear, entryMonth, user);

//       const courseRepository = AppDataSource.getRepository(Course);
//       await courseRepository.save(course);
      
//       res.status(201).json({ message: 'Course added successfully', course });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error adding course:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
