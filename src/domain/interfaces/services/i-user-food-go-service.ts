import { UserFoodGoEntity } from "../../entities/user-food-go-entity.js";

export interface IUserFoodGoService {
    verifyAndCreate(email: string, code: string): Promise<boolean>;
    getByEmail(email: string): Promise<UserFoodGoEntity | null>;
    deleteByEmail(email: string): Promise<number>;
}