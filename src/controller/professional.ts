import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import { User } from "../entity/user";
import { ProfessionalApplication } from "../entity/professional-app";
import { AppDataSource } from "../database/data-source";
import dotenv from "dotenv";

dotenv.config();

const secretKey: string = process.env.JWT_SECRET || 'your_secret_key'

export const createProfessionalApplication = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let decodedToken: (Jwt & JwtPayload) | undefined;
    try {
      // Verify and decode JWT token
      decodedToken = jwt.verify(token, secretKey) as Jwt & JwtPayload;
      console.log("Decoded Token:", decodedToken); // Log decoded token
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    if (!decodedToken || !decodedToken.id) {
      console.error("Invalid token payload");
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid token payload" });
    }

    const loggedInUserId = decodedToken.id;
    console.log("Logged In User ID:", loggedInUserId); // Log loggedInUserId

    // Validate request body fields
    const fieldsToValidate = [
      "personalStatement",
      "addQualification",
      "academicReference",
      "employmentDetails",
      "fundingInformation",
      "disability",
      "passportUpload",
      "englishLanguageQualification",
    ];

    const validateRequest = fieldsToValidate.map((field) =>
      check(field)
        .notEmpty()
        .withMessage(`${field.replace(/([a-z])([A-Z])/g, "$1 $2")} is required`)
    );

    await Promise.all(validateRequest.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // Fetch user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: loggedInUserId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save professional application with passport upload
    const {
      personalStatement,
      addQualification,
      academicReference,
      employmentDetails,
      fundingInformation,
      disability,
      passportUpload,
      englishLanguageQualification,
    } = req.body;

    const professionalApplicationRepository = AppDataSource.getRepository(
      ProfessionalApplication
    );
    const newProfessionalApplication = professionalApplicationRepository.create(
      {
        user,
        personalStatement,
        addQualification,
        academicReference,
        employmentDetails,
        fundingInformation,
        disability,
        passportUpload,
        englishLanguageQualification,
      }
    );

    await professionalApplicationRepository.save(newProfessionalApplication);

    // Generate JWT token with userId in the payload
    const userId = user.id; // Assuming you have the user ID available
    const tokenPayload = { userId }; // Use userId as the key in the payload
    const authToken = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" }); // Include userId in the payload

    return res.status(201).json({ newProfessionalApplication, authToken }); // Include authToken in the response
  } catch (error) {
    console.error("Error creating professional application:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// fetching all application and adding a status field of pending
export const getAllProfessionalApplicationsWithStatus = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all professional applications
    const professionalApplications = await AppDataSource.getRepository(
      ProfessionalApplication
    ).find();

    // Add status field "pending" to each application
    const applicationsWithStatus = professionalApplications.map(
      (application) => ({
        ...application,
        status: "Pending"
      })
    );

    return res.status(200).json(applicationsWithStatus);
  } catch (error) {
    console.error("Error fetching professional applications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// fetching all applications regardless of status
export const getAllProfessionalApplications = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch all professional applications
    const professionalApplications = await AppDataSource.getRepository(ProfessionalApplication).find();

    return res.status(200).json(professionalApplications);
  } catch (error) {
    console.error("Error fetching professional applications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// fetching a single user's application

export const getApplicationsByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if userId is provided
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch applications by user ID
    const applications = await AppDataSource.getRepository(ProfessionalApplication).find({
      where: { user: { id } }
    });

    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications by user ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete application

export const deleteProfessionalApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const professionalApplicationRepository = AppDataSource.getRepository(
      ProfessionalApplication
    );

    const applicationToDelete = await professionalApplicationRepository.findOne(
      {
        where: { id },
      }
    );

    if (!applicationToDelete) {
      return res
        .status(400)
        .json({ error: "Professional application not found" });
    }

    await professionalApplicationRepository.remove(applicationToDelete);

    return res
      .status(200)
      .json({ message: "Professional application deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting professional application:", error);
    return res.status(500).json({ erreo: "Internal server Error" });
  }
};

// delete multiple applications

export const deleteMultipleProfessionalApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const { ids } = req.body;

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ProfessionalApplication)
      .where("id IN (:...ids)", { ids });

    return res.status(200).json({
      message: "Selected professional applications deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting multiple professional applications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
