import { UserFoodGoEntity } from "../entities/user-food-go-entity.js";
import { IUserFoodGoRepository } from "../interfaces/repositories/i-user-food-go-repository.js";
import { IUserFoodGoService } from "../interfaces/services/i-user-food-go-service.js";

export class UserFoodGoService implements IUserFoodGoService {

    private userFoodGoRepository: IUserFoodGoRepository;

    constructor(
        userFoodGoRepository: IUserFoodGoRepository,
    ) {
        this.userFoodGoRepository = userFoodGoRepository;
    }

    async verifyAndCreate(email: string, code: string): Promise<boolean> {
        try {
            const res = await this.getByEmail(email);
            if (res) {
                await this.deleteByEmail(email);
                await this.userFoodGoRepository.create(email, code);
                return true;
            }
            await this.userFoodGoRepository.create(email, code);
            return true;
        } catch (error) {
            console.error("error al verificar el email en sqlite");
            console.error(error);
            throw error;
        }
    }

    async getByEmail(email: string): Promise<UserFoodGoEntity | null> {
        try {
            return this.userFoodGoRepository.getByEmail(email);
        } catch (error) {
             console.error("error al obtener datos de sqlite");
            console.error(error);
            throw error;
        }
    }

    async deleteByEmail(email: string): Promise<number> {
        try {
            return await this.userFoodGoRepository.deleteByEmail(email);
        } catch (error) {
             console.error("error al eliminar datos de sqlite");
            console.error(error);
            throw error;
        }
    }
}