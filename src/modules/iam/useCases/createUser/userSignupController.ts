import { BaseController } from "../../../../infra/http/models/BaseController";
import { CreateUser } from "./createUser";
import express from "express";
import { CreateUserDTO, defaultRequestUser } from "./createUserDTO";
import * as RegisterUserErrors from "./createUserErrors";
import * as AppError from "../../../../shared/core/AppError";

export class UserSignupController extends BaseController {
    constructor(private useCase: CreateUser) {
        super();
    }

    async executeImpl(
        req: express.Request,
        res: express.Response
    ): Promise<any> {

        const dto: CreateUserDTO = req.body as CreateUserDTO;
        dto.requestUser = defaultRequestUser;

        try {
            const result = await this.useCase.execute(dto);

            if (result.isRight()) {
                const createdUser = result.value.getValue();
                // return this.created(res, UserMap.toDTO(createdUser));
                return this.created(res,createdUser,"User registered and otp is  generated, noticed the otp is valid for 5 minutes")
            } else {
                const error = result.value;

                switch (error.constructor) {
                    case RegisterUserErrors.EmailAlreadyExistsError:
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
