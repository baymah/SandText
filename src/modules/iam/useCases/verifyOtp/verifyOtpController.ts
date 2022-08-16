import { BaseController } from "../../../../infra/http/models/BaseController";
import { VerifyOtp } from "./verifyOtp";
import express from "express";
import {VerifyOtpDTO,defaultRequestUser } from "./verifyOtpDTO";
import * as VerifyOtpErrors from "./verifyOtpErrors";
import * as AppError from "../../../../shared/core/AppError";

export class VerifyOtpController extends BaseController {
    constructor(private useCase: VerifyOtp) {
        super();
    }

    async executeImpl(
        req: express.Request,
        res: express.Response
    ): Promise<any> {

        const dto: VerifyOtpDTO = req.body as VerifyOtpDTO;
        dto.requestUser = defaultRequestUser;

        try {
            const result = await this.useCase.execute(dto);

            if (result.isRight()) {

                const createdUser = result.value.getValue();
                return this.created(res,createdUser,"Otp Verification is successfull")

            } else {
                const error = result.value;

                switch (error.constructor) {
                    case VerifyOtpErrors.EmailNotFoundError:
                    case VerifyOtpErrors.OtpNotMatch:
                    case VerifyOtpErrors.OtpExpired:
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
