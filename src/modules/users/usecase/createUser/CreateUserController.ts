import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDto";
import { CreateUserErrors } from "./CreateUserErrors";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import * as express from 'express'
import { AppError } from "../../../../shared/core/AppError";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    let dto: CreateUserDTO = req.body as CreateUserDTO;

    // dto = {
    //   username: TextUtils.sanitize(dto.username),
    //   email: TextUtils.sanitize(dto.email),
    //   password: dto.password
    // }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue().message)
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErrorValue().message)
          case AppError.InputError:
            return this.clientError(res,error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message,req);
        }
        
      } else {
        return this.ok(res, {}, "User creation complete");
      }

    } catch (error) {
      return this.fail(res, error, req);
    }
  }
}