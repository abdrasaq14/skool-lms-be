import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user';
import { Course } from '../entity/course';
import { Qualification } from '../entity/qualification';
import { Application } from '../entity/application';

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
