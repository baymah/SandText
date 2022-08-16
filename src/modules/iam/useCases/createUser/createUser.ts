import { CreateUserDTO, CreateUserDTOSchema, RegisterDTOResponse } from "./createUserDTO";
import * as CreateUserErrors from "./createUserErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import * as AppError from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserRepo } from "../../repo/userRepo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/valueObjects/userEmail";
import { UserPassword } from "../../domain/valueObjects/userPassword";
import { AuthService } from "../../service/authService";
import { lastIndexOf } from "lodash";
import { joiValidate } from "../../../../shared/utils/typeUtils";
import { UserTokens } from "../../domain/userToken";


type Response = Either<
    | CreateUserErrors.EmailAlreadyExistsError
    | AppError.UnexpectedError
    | AppError.PermissionsError
    | AppError.InputError,
    Result<RegisterDTOResponse>
>;

export class CreateUser implements UseCase<CreateUserDTO, Promise<Response>> {
    private userRepo: UserRepo;
    private authService:AuthService

    constructor(
        userRepo: UserRepo,
        authService:AuthService
    ) {
        this.userRepo = userRepo;
        this.authService=authService
    }
    async execute(request: CreateUserDTO): Promise<Response> {
        const { error, value: vRequest } = joiValidate<CreateUserDTO>(
            CreateUserDTOSchema,
            request
        );
        if (error) return left(new AppError.InputError(error.message));

        const {firstname,lastname,requestUser:rawRequestUser } = vRequest;

        //#region Create User Valid Value Objects
        const emailOrError = UserEmail.create(request.email);
        const passwordOrError = UserPassword.create({
            value: request.password,
        });

        const dtoResult = Result.combine([emailOrError, passwordOrError]);

        if (dtoResult.isFailure) {
            return left(new AppError.InputError(dtoResult.error));
        }

        const email: UserEmail = emailOrError.getValue();
        const passwordHash: UserPassword = passwordOrError.getValue();
        //  #endregion

        console.log(passwordHash,"PASSWORDHASH");
        console.log(email,"EMAILS");
        
        try {

            //check if the user email already exist
            const userAlreadyExists = await this.userRepo.getUserByEmail(email);
            console.log(userAlreadyExists,"Already exist")
            if (userAlreadyExists) {
                return left(
                    new CreateUserErrors.EmailAlreadyExistsError(email.value)
                );
            }
            //
            const userOrError: Result<User> = User.create({
                email,
                firstname:firstname?firstname:"",
                lastname:lastname?lastname:"",
                tokens: UserTokens.create([]),
                passwordHash,
            });

            if (userOrError.isFailure && userOrError.error) {
                return left(new AppError.InputError(userOrError.error));
            }

            const user: User = userOrError.getValue();
            // create otp
            const otpToken:number = this.authService.generateOtp();
            console.log(otpToken,"OTP TOKEN")

            await this.authService.saveGeneratedUserDataAndOtp(
                user,
                otpToken,
            );

            return right(
                Result.ok<RegisterDTOResponse>({
                    email:user.email.value,
                    otp:otpToken,
                })
            );
        } catch (err) {
            return left(
                new AppError.UnexpectedError(
                    err,
                    this.constructor.name,
                    request
                )
            );
        }
    }
}
