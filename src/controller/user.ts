// import { Request, Response } from "express";
// import { Users } from "../entity/user";
// import { AppDataSource } from "../database/data-source";

// // Create a User
// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     const { fullname, email, password } = req.body;

//     // Create a new user instance
//     const newUser = userRepository.create({ fullname, email, password });

//     // Save the user to the database
//     const savedUser = await userRepository.save(newUser);

//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get all Users
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     const users = await userRepository.find();

//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error getting users:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get a User
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     const user = await userRepository.findOneBy({ id: req.params.id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error getting user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Update a User
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     const user = await userRepository.findOneBy({ id: req.params.id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     userRepository.merge(user, req.body);

//     const updatedUser = await userRepository.save(user);

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Delete a User
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     const user = await userRepository.findOneBy({ id: req.params.id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     await userRepository.remove(user);

//     res.status(204).json(user);
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
import { Request, Response } from "express";

import { User } from "../entity/user";
import { AppDataSource } from "../database/data-source";

export const registrationStageController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, countryOfPermanentResidence } = req.body;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.countryOfPermanentResidence = countryOfPermanentResidence;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const applicationStageController = async (req: Request, res: Response) => {
  try {
    const { userId, gender, countryOfBirth, nationality } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne(userId);

    if (user) {
      user.gender = gender;
      user.countryOfBirth = countryOfBirth;
      user.nationality = nationality;
      await userRepository.save(user);
      res.status(200).json({ message: 'Application stage updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating application stage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const qualificationStageController = async (req: Request, res: Response) => {
  try {
    const { userId, institutionName, fieldOfStudy, yearOfGraduation, gradeOfCCGP, qualificationType, countryOfInstitution } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne(userId);

    if (user) {
      user.institutionName = institutionName;
      user.fieldOfStudy = fieldOfStudy;
      user.yearOfGraduation = yearOfGraduation;
      user.gradeOfCCGP = gradeOfCCGP;
      user.qualificationType = qualificationType;
      user.countryOfInstitution = countryOfInstitution;
      await userRepository.save(user);
      res.status(200).json({ message: 'Qualification stage updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating qualification stage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
