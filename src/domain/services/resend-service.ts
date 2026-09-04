import { resendEmailSend } from "../../infrastructure/config/resent-config.js";
import { generateCode } from "../../infrastructure/helpers/generate-code.js";
import { IResendService } from "../interfaces/services/i-resend-service.js";

export class ResendService implements IResendService {

    constructor() {}

    async resendMessageRegisterFoodGo(email: string, token: string, code: string): Promise<boolean> {
        try {
            const subject = 'Bienvenido a Mis Comidas';
            const html = `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Bienvenido a Mis Comidas</h2>

                    <p>
                    Tu cuenta ha sido creada exitosamente.
                    </p>

                    <p>
                    Haz clic en el siguiente enlace para crear tu contraseña:
                    </p>

                    <p>
                    Codigo de verificación ${code}
                    </p>

                    <a
                    href="https://food-go-12980.web.app/register/${token}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#F97316;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    "
                    >
                    Completar registro
                    </a>

                    <p>
                    Si no solicitaste este acceso, puedes ignorar este mensaje.
                    </p>
                </div>
            `;
            await resendEmailSend(email, subject, html, "FootGo");
            return true;
        } catch (error) {
            console.error("error al enviar mesaje de registro para FoodGo");
            console.error(error);
            throw error;
        }
    }
}