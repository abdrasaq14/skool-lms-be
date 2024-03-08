import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import { Application } from "../entity/onboarding";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export const createOnboarding = async (req: Request, res: Response) => {
  try {
    // Extract the user id from the request parameters
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ noTokenError: "Unauthorized - Token not available" });
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const userId = decoded.id;

    // Extract onboarding data from the request body
    const { course } = req.body;
    console.log(course);

    const {
      courseType,
      studyMode,
      courseSearch,
      entryYear,
      entryMonth,
      gender,
      birthCountry,
      nationality,
    } = course;

    // Check if courseType is present and not null
    if (!courseType) {
      return res.json({ error: "Course type is required" });
    }

    // Find the user in the database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Create Course and Application entities
    const courseEntity = new Course(
      courseType,
      studyMode,
      courseSearch,
      entryYear,
      entryMonth,
      userId
    );

    const applicationEntity = new Application(
      gender,
      birthCountry,
      nationality,
      userId
    );

    const courseRepository = AppDataSource.getRepository(Course);
    const applicationRepository = AppDataSource.getRepository(Application);

    await courseRepository.save(courseEntity);
    await applicationRepository.save(applicationEntity);

    // Return a success message
    return res.json({ successMessage: "Onboarding completed successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" });
  }
};
