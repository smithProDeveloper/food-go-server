import type {Express, Request, Response} from 'express';
import { setupMiddlewareResend } from '../setup-middleware-routes/setup-middleware-resend.js';
import { IUserFoodGoRepository } from '../../domain/interfaces/repositories/i-user-food-go-repository.js';

export const setupRoutes = (
    app: Express,
    userFoodGoDataStorage: IUserFoodGoRepository,
) => {
    // Basic route
    app.get('/', (_req: Request, res: Response) => {res.json({message: 'Welcome to my backend API'});});
    
    const resendMiddleware = setupMiddlewareResend(userFoodGoDataStorage);

    app.use("/api/resend", resendMiddleware);
}