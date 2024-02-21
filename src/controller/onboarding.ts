import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user';
import { Course } from '../entity/course';
import { Qualification } from '../entity/qualification';
import { Application } from '../entity/application';

const formData: Record<string, any> = {};

export const updateOnboarding = async (req: Request, res: Response) => {
    try {
        // Extract the user id from the request parameters
        const userId = req.params.userId;

        // Extract profile data from the request body
        const { course, application, qualification } = req.body;

        // Store the form data for the current stage
        formData[userId] = { ...formData[userId], ...course, ...application, ...qualification };

        // If it's not the last stage, return a success message
        if (formData[userId].stage < 3) {
            return res.status(200).json({ message: 'Data saved successfully' });
        }

        // Get the user repository
        const userRepository = AppDataSource.getRepository(User);

        // Find the user in the database
        const user = await userRepository.findOne({ where: { id: userId } });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's onboarding status with the final form data
        const finalFormData = formData[userId];

        // Create and associate Course entity
        const courseEntity = new Course(
            finalFormData.courseType,
            finalFormData.studyMode,
            finalFormData.courseSearch,
            finalFormData.entryYear,
            finalFormData.entryMonth,
            user
        );

        // Create and associate Application entity
        const applicationEntity = new Application(
            user,
            finalFormData.gender,
            finalFormData.countryOfBirth,
            finalFormData.nationality
        );

        // Create and associate Qualification entity
        const qualificationEntity = new Qualification(
            user,
            finalFormData.institutionName,
            finalFormData.fieldOfStudy,
            finalFormData.yearOfGraduation,
            finalFormData.gradeOfCGPA,
            finalFormData.qualificationType,
            finalFormData.countryOfInstitution
        );

        // Save the entities
        await userRepository.save(user);
        await userRepository.save(courseEntity);
        await userRepository.save(applicationEntity);
        await userRepository.save(qualificationEntity);

        // Clear the form data after submission
        delete formData[userId];

        // Return a success message
        return res.status(200).json({ message: 'Onboarding completed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export const createCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const courseRepository = AppDataSource.getRepository(Course);

    const { courseType, studyMode, courseSearch, entryYear, entryMonth } = req.body;

    const newCourse = courseRepository.create({ user, courseType, studyMode, courseSearch, entryYear, entryMonth });

    const savedCourse = await courseRepository.save(newCourse);

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createQualification = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const qualificationRepository = AppDataSource.getRepository(Qualification);

    const { institutionName, fieldOfStudy, yearOfGraduation, gradeOfCGPA, qualificationType, countryOfInstitution } = req.body;

    const newQualification = qualificationRepository.create({ user, institutionName, fieldOfStudy, yearOfGraduation, gradeOfCGPA, qualificationType, countryOfInstitution });

    const savedQualification = await qualificationRepository.save(newQualification);

    res.status(201).json(savedQualification);
  } catch (error) {
    console.error('Error creating qualification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const applicationRepository = AppDataSource.getRepository(Application);

    const { gender, countryOfBirth, nationality } = req.body;

    const newApplication = applicationRepository.create({ user, gender, countryOfBirth, nationality });

    const savedApplication = await applicationRepository.save(newApplication);

    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

