import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export class UserDoesNotExistError extends Result<UseCaseError> {
    constructor(userId: string) {
        super(false, {
            message: `The user with id; ${userId} does not exist`,
        } as UseCaseError);
    }
}

export class InvalidUserIdType extends Result<UseCaseError> {
    constructor(userId: string) {
        super(false, {
            message: `The id; ${userId} is not valid`,
        } as UseCaseError);
    }
}
