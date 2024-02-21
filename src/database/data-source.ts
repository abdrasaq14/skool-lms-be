import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import { Application } from "../entity/application"; // Import the Application entity
import { Qualification } from "../entity/qualification"; // Import the Qualification entity
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_CONNECTION_URL,
  synchronize: true,
  logging: false,
  entities: [User, Course, Application, Qualification], // Add Application and Qualification entities here
  subscribers: [],
  migrations: [],
});
