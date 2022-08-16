import { RequestEmailVerificationDTO } from "./requestEmailVerificationDTO";
import { InvalidUserIdType, UserDoesNotExistError } from "./requestEmailVerificationErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import * as AppError from "../../../../shared/core/AppError";
// import { UserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserRepo } from "../../repo/userRepo";
import { Token, TokenType } from "../../domain/token";
import { UserId } from "../../domain/userId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export type RequestEmailVerificationResponse = Either<
    | UserDoesNotExistError
    | InvalidUserIdType
    | AppError.UnexpectedError
    | AppError.PermissionsError,
    Result<void>
>;

export class RequestEmailVerification
    implements
        UseCase<
            RequestEmailVerificationDTO,
            Promise<RequestEmailVerificationResponse>
        > {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async execute(
        request: RequestEmailVerificationDTO
    ): Promise<RequestEmailVerificationResponse> {
        // const { userId } = request;

        try {

            const userId = UserId.create(new UniqueEntityID(request.userId));

            if(userId.isFailure) return left(new InvalidUserIdType(request.userId))

            let user = await this.userRepo.getUserByUserId(userId.getValue().id.toValue() as string);

            if (!user) {
                return left(new UserDoesNotExistError(request.userId));
            }

            const tokenOrError = Token.create({
                type: TokenType.EmailVerification,
                userId: userId.getValue(),
            })

            if(tokenOrError.isFailure) console.log(tokenOrError.errorValue,"Erororroor");

            const token = tokenOrError.getValue()

            console.log(token,"TOEJN")

            const userToken =user.addToken(token);
            
            console.log(userToken,"userWithToken");

            await this.userRepo.save(user)

            user.dispatchAggregate(user.id)

            return right(Result.ok<void>());
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
