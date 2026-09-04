export const dataMessage = {
    registerUser: [
        {
            application: "FoodGo",
            subject: 'Bienvenido a Mis Comidas',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Bienvenido a Mis Comidas</h2>

                    <p>
                    Tu cuenta ha sido creada exitosamente.
                    </p>

                    <p>
                    Haz clic en el siguiente enlace para completar tu registro:
                    </p>

                    <a
                    href="http://localhost:5173/register"
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
                `
        }
    ],
};