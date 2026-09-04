import { UserFoodGoEntity } from "../../entities/user-food-go-entity.js";

export interface IUserFoodGoRepository {
    create(email: string, code: string): Promise<UserFoodGoEntity>;
    getByEmail(email: string): Promise<UserFoodGoEntity | null>;
    deleteByEmail(email: string): Promise<number>;
}