import * as express from "express";
import { boolean } from "joi";
import { Pagination } from "../../../@types";
import logger from "../../../shared/core/Logger";

export abstract class BaseController {
    protected abstract executeImpl(
        req: express.Request,
        res: express.Response
    ): Promise<void | any>;

    public async execute(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            logger.error(`[BaseController]: Uncaught controller error`, {
                err,
            });
            this.fail(res, "An unexpected error occurred", req);
        }
    }

    public static jsonResponse(
        res: express.Response,
        code: number,
        message: string,
        success:boolean
    ) {
        console.log(success,"SUCCES VALIUE IN JSONRESPONSE")
        return res.status(code).json({ message,success });
    }

    public ok<T>(
        res: express.Response,
        data: T,
        message: string,
        pagination?: Pagination
    ) {
        if (pagination)
            pagination = {
                ...pagination,
                pages: Math.floor(pagination.total / pagination.perPage) + 1,
            };
        return res.status(200).json(data?{ message,success:true, data, pagination }:{ message,success:true, pagination });
    }

    public created<T>(res: express.Response, data: T, message = "Created") {
        return res.status(201).json({ message,success:true,data });
    }

    public clientError(
        res: express.Response,
        message?: string,
        success?:boolean,
        req?: express.Request
    ) {
        if (req && message) req.error = new Error(message);
        return BaseController.jsonResponse(
            res,
            400,
            message ? message : "Bad Request",
            false
        );
    }

    public unauthorized(res: express.Response, message?: string,success?:boolean) {
        return BaseController.jsonResponse(
            res,
            401,
            message ? message : "Unauthorized",
            success?success:true
        );
    }

    public paymentRequired(
        res: express.Response,
        message?: string,
        success?:boolean,
        req?: express.Request
    ) {
        if (req && message) req.error = new Error(message);
        return BaseController.jsonResponse(
            res,
            402,
            message ? message : "Payment required",
            success?success:false
        );
    }

    public forbidden(res: express.Response, message?: string,success?:boolean) {
        return BaseController.jsonResponse(
            res,
            403,
            message ? message : "Forbidden",
            false
        );
    }

    public notFound(res: express.Response, message?: string,success?:boolean) {
        return BaseController.jsonResponse(
            res,
            404,
            message ? message : "Not found",
            success?success:false
        );
    }

    public conflict(res: express.Response, message?: string,success?:boolean) {
        return BaseController.jsonResponse(
            res,
            409,
            message ? message : "Conflict",
            success?success:false
        );
    }

    public tooMany(res: express.Response, message?: string,success?:boolean) {
        return BaseController.jsonResponse(
            res,
            429,
            message ? message : "Too many requests",
            false
        );
    }

    // public todo(res: express.Response) {
    //     return BaseController.jsonResponse(res, 400, "TODO");
    // }

    public fail(
        res: express.Response,
        error: Error | string,
        req: express.Request
    ) {
        req.error = typeof error === "string" ? new Error(error) : error;

        return res.status(500).json({
            success:false,
            message: error.toString(),
        });
    }
}
