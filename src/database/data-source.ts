import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Course } from "../entity/course";
import { Application } from "../entity/application"; // Import the Application entity
import { Qualification } from "../entity/qualification"; // Import the Qualification entity

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://vxmjibrn:H3OFjWWyZHkx1yQlRu5vzcnH02iYlx3o@lallah.db.elephantsql.com/vxmjibrn",
  synchronize: true,
  logging: false,
  entities: [User, Course, Application, Qualification], // Add Application and Qualification entities here
  subscribers: [],
  migrations: [],
});
