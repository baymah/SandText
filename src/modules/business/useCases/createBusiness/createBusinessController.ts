import { BaseController } from "../../../../infra/http/models/BaseController";
import { CreateBusiness } from "./createBusiness";
import express from "express";
import { CreateBusinessDTO, defaultRequestUser } from "./createBusinessDTO";
import{PortfolioDoesNotExistError,UserDoesNotExistError} from "./createBusinessError";
import * as AppError from "../../../../shared/core/AppError";

export class CreateBusinessController extends BaseController {
    constructor(private useCase: CreateBusiness) {
        super();
    }

    async executeImpl(
        req: express.Request,
        res: express.Response
    ): Promise<any> {

        const dto: CreateBusinessDTO = req.body as CreateBusinessDTO;
        // dto.requestUser = defaultRequestUser;

        const requestUser: any = req.requestUser;
        // dto.userId = req.req.userId;
        dto.requestUser = requestUser;

        try {
            const result = await this.useCase.execute(dto);

            if (result.isRight()) {
                const createdBusiness = result.value.getValue();
                return this.created(res,createdBusiness,"Business Created Successfully...")
            } else {
                const error = result.value;

                switch (error.constructor) {
                    case UserDoesNotExistError:
                    case AppError.InputError:
                        return this.clientError(
                            res,
                            error.errorValue().message,
                            false,
                            req
                        );
                    default:
                        return this.fail(res, error.errorValue().message, req);
                }
            }
        } catch (error) {
            return this.fail(res, error, req);
        }
    }
}
