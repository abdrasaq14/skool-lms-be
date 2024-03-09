import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import { Onboarding } from "../entity/onboarding"; // Import the Application entity
import { ProfessionalApplication } from "../entity/professional-app";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_CONNECTION_URL,
  synchronize: true,
  logging: false,
  entities: [User, Course, Onboarding, ProfessionalApplication],
  subscribers: [],
  migrations: [],
  extra: {
    timezone: "local",
  },
});
