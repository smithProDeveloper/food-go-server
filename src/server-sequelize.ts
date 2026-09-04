import {Express} from "express";
import { sequelizeSqliteConfig } from "./infrastructure/config/sequelize-sqlite-config.js";

export async function serverSequelize(app: Express, port: number) {
    try {
        //await sequelizeConfig.sync({alter: true});
        await sequelizeSqliteConfig.authenticate();
        console.log("SQLite conectado correctamente");
        await sequelizeSqliteConfig.sync();
        console.log("Tablas sincronizadas correctamente");
        app.listen(port, () => {
            console.log('Servidor Up. Port ==> ', port);
            //console.log('Swagger disponible en http://localhost:4000/api-docs');
        });
    } catch (error) {
        console.error(`Hubo un error al conectar a la base de datos: ${error}`);
    }
}