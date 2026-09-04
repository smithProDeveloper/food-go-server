import { ServerResponse } from "../../../models/server-response.js";


export interface ISendMessageRegisterUseCase {
    execute(email: string): Promise<ServerResponse<boolean>>;
}