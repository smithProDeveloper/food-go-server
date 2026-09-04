import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { serverSequelize } from './server-sequelize.js';
dotenv.config();

// Import entities to initialize them
import "./domain/entities/user-food-go-entity.js";

import { setupRoutes } from './presentation/routes/setup-routes.js';
import { UserFoodGoRepository } from './infrastructure/repositories/user-food-go-repository.js';


export const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

const userFoodGoDataStorage = new UserFoodGoRepository();

setupRoutes(
    app,
    userFoodGoDataStorage,
);

serverSequelize(app, port).then(() => {});
