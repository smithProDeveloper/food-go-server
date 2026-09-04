import { Request, Response, NextFunction } from "express";
import { verifyTokenCodeUserFoodGo } from "../config/jwt-config.js";

export interface FootGoAuthenticateRequest extends Request {
    tokenData?: {email: string; code: string}
}

export async function foodGoResetPasswordMiddleware(
    req: FootGoAuthenticateRequest,
    res: Response,
    next: NextFunction,
) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
        return res.status(401).json({
            status: 401,
            message: "Token de autenticación requerido",
            data: null
        });
        }

        if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            status: 401,
            message: "Formato de autorización inválido",
            data: null
        });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Token inválido",
                data: null
            });
        }

        const tokenData = verifyTokenCodeUserFoodGo(token);
        if (!tokenData.valid) {
            return res.status(401).json({
                status: 401,
                message: tokenData.error,
                data: null
            });
        }
        req.tokenData = {
            email: tokenData.payload.email,
            code: tokenData.payload.code,
        }
        next();
    } catch (error) {
        console.error("Error verificando Firebase token:", error);

        return res.status(401).json({
            status: 401,
            message: "Token inválido o expirado",
            data: null
        });
    }
}