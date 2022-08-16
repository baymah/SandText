import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export class EmailDoesntExistError extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Email or password is incorrect`,
        } as UseCaseError);
    }
}
export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Email or password is incorrect`,
        } as UseCaseError);
    }
}
