import { DataSource } from "typeorm";
import { User } from "../entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://vxmjibrn:H3OFjWWyZHkx1yQlRu5vzcnH02iYlx3o@lallah.db.elephantsql.com/vxmjibrn",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});
