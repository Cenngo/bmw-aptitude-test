import { NotFoundError } from "@/interfaces/errors";
import { IResult } from "@/interfaces/result";

export function notFoundResult(descriptor: string) {
    return {
        success: false,
        error: new NotFoundError(descriptor),
    };
}

export function successResult<T>(data: T): IResult<T> {
    return {
        success: true,
        data
    };
}