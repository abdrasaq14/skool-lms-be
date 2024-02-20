import { Request, Response } from "express";
import { User } from "../entity/user";
import { Course } from "../entity/course"; // Import the Course entity
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
    const { userId, institutionName, fieldOfStudy, yearOfGraduation, gradeOfCGPA, qualificationType, countryOfInstitution } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne(userId);

    if (user) {
      user.institutionName = institutionName;
      user.fieldOfStudy = fieldOfStudy;
      user.yearOfGraduation = yearOfGraduation;
      user.gradeOfCGPA = gradeOfCGPA; // Change from gradeOfCCGP to gradeOfCGPA
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


export const courseController = async (req: Request, res: Response) => {
  try {
    const { userId, courseType, studyMode, courseSearch, entryYear, entryMonth } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne(userId);

    if (user) {
      // Create a new instance of Course using the constructor
      const course = new Course(courseType, studyMode, courseSearch, entryYear, entryMonth, user);

      const courseRepository = AppDataSource.getRepository(Course);
      await courseRepository.save(course);
      
      res.status(201).json({ message: 'Course added successfully', course });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
