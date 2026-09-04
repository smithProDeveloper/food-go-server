export interface ServerResponse<T> {
    status: number;
    message: string;
    data: T;
}