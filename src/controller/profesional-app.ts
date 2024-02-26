import { Request, Response } from "express";
import { User } from "../entity/user";
import { ProfessionalApplication } from "../entity/professional-app";
import { AppDataSource } from "../database/data-source";

export const createProfessionalApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const professionalApplicationRepository = AppDataSource.getRepository(
      ProfessionalApplication
    );

    const {
      userId,
      personalStatement,
      addQualification,
      academicReference,
      employmentDetails,
      fundingInformation,
      disability,
      passportUpload,
      englishLanguageQualification,
    } = req.body;

    if (
      !userId ||
      !personalStatement ||
      !addQualification ||
      !academicReference ||
      !employmentDetails ||
      !fundingInformation ||
      !disability ||
      !passportUpload ||
      !englishLanguageQualification
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userRepository.findOne(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newProfessionalApplication = professionalApplicationRepository.create(
      {
        user,
        personalStatement,
        addQualification,
        academicReference,
        employmentDetails,
        fundingInformation,
        disability,
        passportUpload: Buffer.from("binary"),
        englishLanguageQualification,
      }
    );

    await professionalApplicationRepository.save(newProfessionalApplication);

    return res
      .status(201)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
