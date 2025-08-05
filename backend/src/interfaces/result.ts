export interface IPaginatedData<T> {
    items: T[];
    totalCount: number;
    start: number;
    end: number;
}

export interface IError {
    message: string;
    code?: string;
    details?: any;
}

export interface IResult<T> {
    success: boolean;
    data?: T;
    error?: IError;
}