import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Course } from "../entity/course"; // Import the Course entity

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://vxmjibrn:H3OFjWWyZHkx1yQlRu5vzcnH02iYlx3o@lallah.db.elephantsql.com/vxmjibrn",
  synchronize: true,
  logging: false,
  entities: [User, Course], // Add Course entity here
  subscribers: [],
  migrations: [],
});
