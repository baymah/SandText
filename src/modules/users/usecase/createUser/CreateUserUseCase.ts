// import { AppError } from "../../../../shared/core/AppError";
import * as AppError from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { joiValidate } from "../../../../shared/utils/typeUtils";
import { UserEmail } from "../../domain/UserEmail";
import { IUserRepo } from "../../repo/userRepo";
import { CreateUserDTO, CreateUserDTOSchema } from "./CreateUserDto";
import { CreateUserErrors } from "./CreateUserErrors";


type Response = Either<
  CreateUserErrors.EmailAlreadyExistsError |
  //   CreateUserErrors.UsernameTakenError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
    private userRepo: IUserRepo;

    constructor (userRepo: IUserRepo) {
        this.userRepo = userRepo;
      }

      async execute (request: CreateUserDTO): Promise<Response> {

        const { error, value } = joiValidate<CreateUserDTO>(
          CreateUserDTOSchema,
          request
        );
        if (error) return left(new AppError.InputError(error.message));

        const emailOrError = UserEmail.create(request.email);

        try{
            return right(Result.ok<void>())
        }
        catch(error){
            // return left(new AppError.UnexpectedError(error)) as Response;
            return left(new AppError.UnexpectedError(
              error,
              this.constructor.name,
              request
          ))
        }
      }
}