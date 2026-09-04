import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY_RESEND = process.env.API_KEY_RESEND;

const resend = new Resend(API_KEY_RESEND);

type ForData = "FootGo"

export async function resendEmailSend(
    to: string, 
    subject: string, 
    html: string, 
    forData: ForData
) {
    const res = await resend.emails.send({
        from: `${forData} <noreply@mail.variedades-smith.xyz>`,
        to: to,
        subject: subject,
        html: html
    });
    console.log('respuesta de resend al enviar mensaje al email');
    console.log(res);
}