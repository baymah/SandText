import * as AppError from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { JWTToken, RefreshToken } from "../../domain/valueObjects/jwt";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/valueObjects/userEmail";
import { UserPassword } from "../../domain/valueObjects/userPassword";
import { UserMap } from "../../mappers/userMap";
import { LoginDTO, LoginDTOResponse } from "./loginDTO";
import * as LoginUseCaseErrors from "./loginErrors";
import { UserRepo } from "../../repo/userRepo";
import { AuthService } from "../../service/authService";

type Response = Either<
    LoginUseCaseErrors.EmailDoesntExistError | AppError.UnexpectedError,
    Result<LoginDTOResponse>
>;

export class LoginUseCase implements UseCase<LoginDTO, Promise<Response>> {
    constructor(private userRepo: UserRepo, private authService: AuthService) {}

    async execute(request: LoginDTO): Promise<Response> {
        // eslint-disable-next-line no-console
        try {
            //#region Validate DTO
            const emailOrError = UserEmail.create(request.email);
            const passwordOrError = UserPassword.create({
                value: request.password,
            });
            const dtoResult = Result.combine([emailOrError, passwordOrError]);

            if (dtoResult.isFailure) {
                return left(
                    new AppError.InputError(dtoResult.error)
                ) as Response;
            }
            //#endregion

            //#region Attempt to Fetch User
            const email: UserEmail = emailOrError.getValue();
            const password: UserPassword = passwordOrError.getValue();
            const user: User | undefined = await this.userRepo.getUserByEmail(
                email
            );
            //#endregion

            // If user does not exist, return Error(Email or Password incorrect)
            if (!user) {
                return left(new LoginUseCaseErrors.EmailDoesntExistError());
            }

            // Attempt to Match Password with PasswordHash
            const passwordValid = await user.passwordHash.comparePassword(
                password.value
            );

            // If password does not match, return Error(Email or Password incorrect)
            if (!passwordValid) {
                return left(new LoginUseCaseErrors.PasswordDoesntMatchError());
            }

            // create jwt
            const accessToken: JWTToken = this.authService.signJWT(
                UserMap.toJWTClaim(user)
            );

            const refreshToken: RefreshToken = this.authService.createRefreshToken();

            // user.setLoginDetails(request.ip);

            await this.authService.saveAuthenticatedUser(
                user,
                accessToken,
                refreshToken
            );
            // Save loginDetails
            await this.userRepo.save(user);

            // Delete  Cached RequestUserDTO
            this.authService.deleteCachedUserPermissions(
                user.userId.id.toString()
            );
            // return jwt
            return right(
                Result.ok<LoginDTOResponse>({
                    accessToken,
                    refreshToken,
                })
            );
        } catch (error) {
            return left(
                new AppError.UnexpectedError(error, this.constructor.name, {
                    email: request.email,
                    ip: request.ip,
                })
            );
        }
    }
}
