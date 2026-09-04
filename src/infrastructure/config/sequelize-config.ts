import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelizeConfig = new Sequelize(
    process.env.URL_CONNECT_DATA_BASE || "localhost",
    {
        dialect: 'postgres',
        logging: false,
    }
);