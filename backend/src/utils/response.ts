import { NotFoundError } from "@/interfaces/errors";
import { IResult } from "@/interfaces/result";
import { Response } from "express";

export function resolveResult<T>(result: IResult<T>, res: Response): void {
    if (result.success) {
        res.json(result.data);
        return;
    }

    if(result.error instanceof NotFoundError) {
        res.status(404).json({
            message: result.error.message,
            code: 'NOT_FOUND',
            details: {},
        });
        return;
    }

    if(result.error instanceof Error) {
        res.status(500).json({
            message: result.error.message,
            code: 'INTERNAL_SERVER_ERROR',
            details: {}
        });
        return;
    }
}