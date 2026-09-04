import { Sequelize } from "sequelize";

export const sequelizeSqliteConfig = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
  logging: false,
});