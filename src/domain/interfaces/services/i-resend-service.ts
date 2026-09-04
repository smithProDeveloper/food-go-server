export interface IResendService {
    resendMessageRegisterFoodGo(email: string, token: string, code: string): Promise<boolean>;
}