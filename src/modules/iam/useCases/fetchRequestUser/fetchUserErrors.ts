import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export class UserDoesntExistError extends Result<UseCaseError> {
    constructor(email: string) {
        super(false, {
            message: `No user with the email; ${email} was found`,
        } as UseCaseError);
    }
}
export class PermissionError extends Result<UseCaseError> {
    constructor(email: string) {
        super(false, {
            message: `You do not have permissions fetch this user; ${email}, Please login and retry.`,
        } as UseCaseError);
    }
}
