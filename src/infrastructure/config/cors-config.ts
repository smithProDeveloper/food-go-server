import type {CorsOptions} from "cors";

const whitelist = [
    'http://localhost:5173',
    'https://food-go-12980.web.app',
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