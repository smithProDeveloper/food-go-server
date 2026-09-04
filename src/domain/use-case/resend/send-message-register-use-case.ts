import { generateCode } from "../../../infrastructure/helpers/generate-code.js";
import { IResendService } from "../../interfaces/services/i-resend-service.js";
import { IUserFoodGoService } from "../../interfaces/services/i-user-food-go-service.js";
import { ISendMessageRegisterUseCase } from "../../interfaces/use.case/resend/i-send-message-register-use-case.js";
import { ServerResponse } from "../../models/server-response.js";
import { generateTokenCodeUserFoodGo } from "../../../infrastructure/config/jwt-config.js";

export class SendMessageRegisterUseCase implements ISendMessageRegisterUseCase {

    private resendService: IResendService;
    private userFoodGoServer: IUserFoodGoService;

    constructor(
        resendService: IResendService,
        userFoodGoServer: IUserFoodGoService,
    ) {
        this.resendService = resendService;
        this.userFoodGoServer = userFoodGoServer;
    }

    async execute(email: string): Promise<ServerResponse<boolean>> {
        try {
            const code = generateCode();
            console.log("se genero el codigo");
            console.log(code);
            const verifyData = await this.userFoodGoServer.verifyAndCreate(email, code);
            console.log("se verifica y crea el email y code en sqlite");
            console.log(verifyData);
            const token: string = generateTokenCodeUserFoodGo({email, code});
            console.log("genera token");
            console.log(token);
            const resResend = await this.resendService.resendMessageRegisterFoodGo(email, token, code);
            console.log("se envia el mensaje al correo");
            console.log(resResend);
            return {
                status: 200,
                message: "mesaje enviado correctamente",
                data: true
            }
        } catch (error) {
            throw error;
        }
    }
}