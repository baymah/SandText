// import { VerifyUserEmailDTO } from "./verifyUserEmailDTO";
// import {
//     IncorrectTokenError,
//     TokenExpiredError,
//     UserDoesNotExistError,
// } from "./verifyUserAccountErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import * as AppError from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserRepo } from "../../repo/userRepo";
import { VerifyUserAccountDTO } from "./verifyUserAccountDTO";
import { IncorrectTokenError, TokenExpiredError, UserDoesNotExistError } from "./verifyUserAccountError";

export type VerifyUserAccountResponse = Either<
    | UserDoesNotExistError
    | TokenExpiredError
    | IncorrectTokenError
    | AppError.UnexpectedError
    | AppError.PermissionsError
    | Result<any>,
    Result<void>
>;

export class VerifyUserAccount
    implements UseCase<VerifyUserAccountDTO, Promise<VerifyUserAccountResponse>> {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo;
    }

    async execute(
        request: VerifyUserAccountDTO
    ): Promise<VerifyUserAccountResponse> {
        const { userId, verificationStatus } = request;

        try {
            const user = await this.userRepo.getUserByUserId(userId);
            if (!user) {
                return left(new UserDoesNotExistError(userId));
            }

            console.log(user,"USER TO UPDATE:::")
            user.addEmailVerificationStatus(verificationStatus)
            console.log(user,"UserToUp")
            // console.log(user,"BEFORE SAVING")
            await this.userRepo.save(user);
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
