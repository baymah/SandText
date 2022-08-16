import * as VerifyOtpErrors from "./verifyOtpErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import * as AppError from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserRepo } from "../../repo/userRepo";
import { User, UserProps } from "../../domain/user";
import { UserEmail } from "../../domain/valueObjects/userEmail";
import { UserPassword } from "../../domain/valueObjects/userPassword";
import { AuthService } from "../../service/authService";
import { CreateUserDTO } from "../createUser/createUserDTO";
import { JWTToken, RefreshToken } from "../../../users/domain/Jwt";
import { UserMap } from "../../mappers/userMap";
import { VerifyOtpDTO, VerifyOtpDTOResponse } from "./verifyOtpDTO";
import { UserTokens } from "../../domain/userToken";


type Response = Either<
    | VerifyOtpErrors.EmailNotFoundError
    | VerifyOtpErrors.OtpNotMatch
    | VerifyOtpErrors.OtpExpired
    | VerifyOtpErrors.EmailAlreadyExistsError
    | AppError.UnexpectedError
    | AppError.PermissionsError
    | AppError.InputError,
    Result<VerifyOtpDTOResponse>
>;

export class VerifyOtp implements UseCase<VerifyOtpDTO, Promise<Response>> {
    private userRepo: UserRepo;
    private authService:AuthService

    constructor(
        userRepo: UserRepo,
        authService:AuthService
    ) {
        this.userRepo = userRepo;
        this.authService=authService
    }

    async execute(request: VerifyOtpDTO): Promise<Response> {
        const {
            otp:requestOtp,
            requestUser:rawRequestUser,
        } = request;

       
        //#region Create User Valid Value Objects
        const emailOrError = UserEmail.create(request.email);

        const email: UserEmail = emailOrError.getValue();
        
        try {

            const cachedUser= await this.authService.getCatchUserDataByEmail(email.value);

            if(cachedUser===null) return left(new VerifyOtpErrors.OtpExpired(email.value));

            const {passwordHash,firstname,lastname,otp} = JSON.parse(cachedUser) as any

            if(otp!==requestOtp) return left(new VerifyOtpErrors.OtpNotMatch(requestOtp));

            const passwordOrError = UserPassword.create({value:passwordHash.props.value});
            if (passwordOrError.isFailure && passwordOrError.error) {
                return left(new AppError.InputError(passwordOrError.error));
            }

            const userOrError: Result<User> = User.create({
                email,
                firstname:firstname,
                lastname:lastname,
                passwordHash:passwordOrError.getValue(),
                tokens: UserTokens.create([]),
            });

            //Error creating user...
            if (userOrError.isFailure && userOrError.error) {
                return left(new AppError.InputError(userOrError.error));
            }

            const user: User = userOrError.getValue();

             // create jwt
             const accessToken: JWTToken = this.authService.signJWT(
                UserMap.toJWTClaim(user)
            );

            const refreshToken: RefreshToken = this.authService.createRefreshToken();

            await this.authService.saveAuthenticatedUser(
                user,
                accessToken,
                refreshToken
            );

            await this.userRepo.save(user);
            return right(
                Result.ok<VerifyOtpDTOResponse>({
                   accessToken,
                   refreshToken
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
