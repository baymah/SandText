import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export class EmailNotFoundError extends Result<UseCaseError> {
    constructor(email: string) {
        super(false, {
            message: `The email ${email} associated for this account not found`,
        } as UseCaseError);
    }
}

export class OtpExpired extends Result<UseCaseError> {
    constructor(email: string) {
        super(false, {
            message: `The otp for user with ${email} has expired`,
        } as UseCaseError);
    }
}
export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
        super(false, {
            message: `The email ${email} associated for this account already exists`,
        } as UseCaseError);
    }
}

export class OtpNotMatch extends Result<UseCaseError> {
    constructor(otp: number) {
        super(false, {
            message: `The otp ${otp} is incorrect enter correct otp`,
        } as UseCaseError);
    }
}


