import  express from "express";
import { Response, Request } from 'express';
import { ISendMessageRegisterUseCase } from "../../domain/interfaces/use.case/resend/i-send-message-register-use-case.js";
import { UserFoodGoPost } from "../../domain/models/userFoodGoPost.js";
import { foodGoResetPasswordMiddleware, FootGoAuthenticateRequest } from "../../infrastructure/middlewares/foodGoResetPasswordMiddleware.js";
import { IVerifyTokenFoodGoUseCase } from "../../domain/interfaces/use.case/resend/i-verify-token-food-go-use-case.js";

export default function ResendRoutes(
    sendMessageRegisterUseCase: ISendMessageRegisterUseCase,
    verifyTokenFoodGoUseCase: IVerifyTokenFoodGoUseCase,
) {

    const router = express.Router();

    router.post("/food-go/reset-password", async (req: Request, res: Response) => {
        try {
            console.log("data enviada por el cliente");
            console.log(req.body);
            const body = req.body as UserFoodGoPost;
            const response = await sendMessageRegisterUseCase.execute(body.email);
            res.status(200).send(response);
        } catch (error) {
            console.error("Error en ....");
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null,
                });
                return;
            }
            res.status(500).json({
                status: 500,
                message: "Error desconocido",
                data: null,
            });
        }
    });

    router.post("/food-go/verify-token", foodGoResetPasswordMiddleware, async (req: FootGoAuthenticateRequest, res: Response) => {
        try {
            console.log("data enviada por el cliente");
            console.log(req.tokenData);
            const tokenData = req.tokenData;
            const bodyData = req.body as {code: string;}
            const response = await verifyTokenFoodGoUseCase.execute(
                bodyData.code,
                tokenData ? tokenData.email : undefined,
                tokenData ? tokenData.code : undefined,
            );
            res.status(200).send(response);
        } catch (error) {
            console.error("Error en ....");
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    status: 500,
                    message: error.message,
                    data: null,
                });
                return;
            }
            res.status(500).json({
                status: 500,
                message: "Error desconocido",
                data: null,
            });
        }
    });

    return router;
}