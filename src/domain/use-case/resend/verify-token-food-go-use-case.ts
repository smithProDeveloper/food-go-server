import { IUserFoodGoService } from "../../interfaces/services/i-user-food-go-service.js";
import { IVerifyTokenFoodGoUseCase } from "../../interfaces/use.case/resend/i-verify-token-food-go-use-case.js";
import { ServerResponse } from "../../models/server-response.js";

export class VerifyTokenFoodGoUseCase implements IVerifyTokenFoodGoUseCase {

    private userFoodGoService: IUserFoodGoService;

    constructor(
        userFoodGoService: IUserFoodGoService,
    ) {
        this.userFoodGoService = userFoodGoService;
    }

    async execute(
        codeUser: string,
        emailToken?: string,
        codeToken?: string,
    ): Promise<ServerResponse<string>> {
        try {
            if (!emailToken || !codeToken) {
                return {
                    status: 401,
                    message: "No tiene permisos (No se envio el token)",
                    data: '',
                }
            }
            if (codeUser !== codeToken) {
                return {
                    status: 401,
                    message: "Codigo incorrecto.",
                    data: ''
                }
            }
            const verifyEmail = await this.userFoodGoService.getByEmail(emailToken);
            if (!verifyEmail) {
                return {
                    status: 401,
                    message: "Email no autorizado.",
                    data: ''
                }
            }
            if (verifyEmail && verifyEmail.code !== codeUser) {
                return {
                    status: 401,
                    message: "Codigo incorrecto.",
                    data: ''
                }
            }
            await this,this.userFoodGoService.deleteByEmail(emailToken);
            return {
                status: 200,
                message: "Todo es correcto.",
                data: emailToken
            }
        } catch (error) {
            console.error("Error al verificar el token de registro de foog go");
            console.error(error);
            throw error;
        }
    }
}