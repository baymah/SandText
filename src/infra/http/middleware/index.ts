import {Request, Response,NextFunction } from "express";
import { AuthMiddleware } from "./authMiddleware";
import { authService } from "../../../modules/iam/service";
import { fetchRequestUser } from "../../../modules/iam/useCases/fetchRequestUser";

class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;

export function errorMiddleware(
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    res.status(err.status || 500).json({
        message: err.message || "Unexpected Error",
        status: "error",
        data: null,
    });
}

export const authMiddleware = new AuthMiddleware(authService, fetchRequestUser);