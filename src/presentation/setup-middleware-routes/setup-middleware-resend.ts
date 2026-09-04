import { IUserFoodGoRepository } from "../../domain/interfaces/repositories/i-user-food-go-repository.js";
import { ResendService } from "../../domain/services/resend-service.js";
import { UserFoodGoService } from "../../domain/services/user-food-go-service.js";
import { SendMessageRegisterUseCase } from "../../domain/use-case/resend/send-message-register-use-case.js";
import { VerifyTokenFoodGoUseCase } from "../../domain/use-case/resend/verify-token-food-go-use-case.js";
import ResendRoutes from "../routes/resend-routes.js";

export function setupMiddlewareResend(
    userFoodGoDataStorage: IUserFoodGoRepository,
) {
    
    return ResendRoutes(
        new SendMessageRegisterUseCase(
            new ResendService(),
            new UserFoodGoService(userFoodGoDataStorage),
        ),
        new VerifyTokenFoodGoUseCase(
            new UserFoodGoService(userFoodGoDataStorage),
        ),
    )
}