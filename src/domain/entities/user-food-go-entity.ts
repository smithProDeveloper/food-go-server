import { DataTypes, Model } from "sequelize";
import { sequelizeSqliteConfig } from "../../infrastructure/config/sequelize-sqlite-config.js";

export class UserFoodGoEntity extends Model {
    declare id: number;
    declare email: string;
    declare code: string;
}

UserFoodGoEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: sequelizeSqliteConfig,
        tableName: "userFoodGo",
        timestamps: false
    }
);