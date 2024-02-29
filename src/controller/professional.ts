// import { Request, Response } from 'express';
// import { validationResult, check } from 'express-validator';
// import { User } from '../entity/user';
// import { ProfessionalApplication } from '../entity/professional-app';
// import { AppDataSource } from '../database/data-source';

// export const createProfessionalApplication = async (req: Request, res: Response) => {
//   try {
//     const {
//       userId,
//       personalStatement,
//       addQualification,
//       academicReference,
//       employmentDetails,
//       fundingInformation,
//       disability,
//       passportUpload,
//       englishLanguageQualification,
//     } = req.body;

//     const fieldsToValidate = [
//       'userId',
//       'personalStatement',
//       'addQualification',
//       'academicReference',
//       'employmentDetails',
//       'fundingInformation',
//       'disability',
//       'passportUpload',
//       'englishLanguageQualification',
//     ];

//     // Validation rules for the request body fields
//     const validateRequest = fieldsToValidate.map(field =>
//       check(field)
//         .notEmpty().withMessage(`${field.replace(/([a-z])([A-Z])/g, '$1 $2')} is required`)
//     );

//     // Run validations
//     await Promise.all(validateRequest.map(validation => validation.run(req)));

//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Validate passport upload size (minimum 2MB)
//     if (!Buffer.isBuffer(passportUpload) || passportUpload.length < 2 * 1024 * 1024) {
//       return res.status(400).json({ error: 'Passport upload size must be at least 2MB' });
//     }

//     // Fetch user from database
//     const userRepository = AppDataSource.getRepository(User);
//     const user = await userRepository.findOne(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Save professional application with passport upload
//     const professionalApplicationRepository = AppDataSource.getRepository(ProfessionalApplication);
//     const newProfessionalApplication = professionalApplicationRepository.create({
//       user,
//       personalStatement,
//       addQualification,
//       academicReference,
//       employmentDetails,
//       fundingInformation,
//       disability,
//       passportUpload,
//       englishLanguageQualification,
//     });

//     await professionalApplicationRepository.save(newProfessionalApplication);

//     return res.status(201).json(newProfessionalApplication);
//   } catch (error) {
//     console.error('Error creating professional application:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { User } from '../entity/user';
import { ProfessionalApplication } from '../entity/professional-app';
import { AppDataSource } from '../database/data-source';
import dotenv from "dotenv";

dotenv.config();


const secret: string = process.env.JWT_SECRET!;

export const createProfessionalApplication = async (req: Request, res: Response) => {
  try {
    // Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let decodedToken: Jwt & JwtPayload | undefined;
    try {
      // Verify and decode JWT token
      decodedToken = jwt.verify(token, secret) as Jwt & JwtPayload;
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const loggedInUserId = decodedToken.userId;

    // Validate request body fields
    const fieldsToValidate = [
      'personalStatement',
      'addQualification',
      'academicReference',
      'employmentDetails',
      'fundingInformation',
      'disability',
      'passportUpload',
      'englishLanguageQualification',
    ];

    const validateRequest = fieldsToValidate.map(field =>
      check(field)
        .notEmpty().withMessage(`${field.replace(/([a-z])([A-Z])/g, '$1 $2')} is required`)
    );

    await Promise.all(validateRequest.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate passport upload size (minimum 2MB)
    const passportUpload = req.body.passportUpload;
    if (!Buffer.isBuffer(passportUpload) || passportUpload.length < 2 * 1024 * 1024) {
      return res.status(400).json({ error: 'Passport upload size must be at least 2MB' });
    }

    // Fetch user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne(loggedInUserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save professional application with passport upload
    const {
      personalStatement,
      addQualification,
      academicReference,
      employmentDetails,
      fundingInformation,
      disability,
      englishLanguageQualification,
    } = req.body;

    const professionalApplicationRepository = AppDataSource.getRepository(ProfessionalApplication);
    const newProfessionalApplication = professionalApplicationRepository.create({
      user,
      personalStatement,
      addQualification,
      academicReference,
      employmentDetails,
      fundingInformation,
      disability,
      passportUpload,
      englishLanguageQualification,
    });

    await professionalApplicationRepository.save(newProfessionalApplication);

    return res.status(201).json(newProfessionalApplication);
  } catch (error) {
    console.error('Error creating professional application:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProfessionalApplicationsWithStatus = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all professional applications
    const professionalApplications = await AppDataSource.getRepository(ProfessionalApplication).find();

    // Determine the status of each application
    const applicationsWithStatus = professionalApplications.map(application => {
      // Check if passportUpload exists to determine application status
      const isComplete = application.passportUpload !== null && application.passportUpload !== undefined;

      // Add status field to the application object
      return {
        ...application,
        status: isComplete ? 'Complete' : 'Incomplete'
      };
    });

    return res.status(200).json(applicationsWithStatus);
  } catch (error) {
    console.error("Error fetching professional applications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
