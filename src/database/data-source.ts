import { DataSource } from "typeorm";
import { Customer } from "../entity/user";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_CONNECTION_URL,
  synchronize: true,
  logging: false,
  entities: [Customer],
  subscribers: [],
  migrations: [],
});
