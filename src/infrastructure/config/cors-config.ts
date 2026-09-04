import type {CorsOptions} from "cors";

const whitelist = [
    'http://localhost:5173',
    'http://localhost:4001',
    'https://survey-app.variedades-smith.xyz',
];

export const corsConfig: CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true); // permitir
        } else {
            callback(new Error('No autorizado por CORS')); // denegar
        }
    },
    credentials: true
};