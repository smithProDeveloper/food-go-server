import { ServerResponse } from "../../../models/server-response.js";

export interface IVerifyTokenFoodGoUseCase {
    execute(
        codeUser: string,
        emailToken?: string,
        codeToken?: string,
    ): Promise<ServerResponse<string>>;
}