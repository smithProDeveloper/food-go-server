import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET no está definido en el archivo .env');
}
const jwtSecret = secret;

export function generateTokenCodeUserFoodGo(
    payload: {email: string; code: string}
): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
}

export function verifyTokenCodeUserFoodGo(
    token: string
): { valid: true; payload: {email: string; code: string} } | { valid: false; error: string } {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (typeof decoded === 'object' && decoded !== null) {
            return { valid: true, payload: decoded as {email: string; code: string} };
        }
        return { valid: false, error: 'El token no contiene los campos esperados' };
    } catch (error: any) {
        // verificar usando el nombre del error
        if (error.name === 'TokenExpiredError') {
            return { valid: false, error: 'Token expirado' };
        }
        return { valid: false, error: 'Token inválido' };
    }
}