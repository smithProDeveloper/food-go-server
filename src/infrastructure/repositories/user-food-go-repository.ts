import { UserFoodGoEntity } from "../../domain/entities/user-food-go-entity.js";
import { IUserFoodGoRepository } from "../../domain/interfaces/repositories/i-user-food-go-repository.js";

export class UserFoodGoRepository implements IUserFoodGoRepository {

    async create(email: string, code: string): Promise<UserFoodGoEntity> {
        try {
            const res = await UserFoodGoEntity.upsert({
                "email": email,
                "code": code,
            });
            return res[0];
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email: string): Promise<UserFoodGoEntity | null> {
        try {
            return await UserFoodGoEntity.findOne({
                where: {email}
            })
        } catch (error) {
            throw error;
        }
    }

    async deleteByEmail(email: string): Promise<number> {
        try {
            return await UserFoodGoEntity.destroy({
                where: {email}
            });
        } catch (error) {
            throw error;
        }
    }
}