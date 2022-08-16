
// import { Result } from "./Result";
// import { UseCaseError } from "./UseCaseError";

// export namespace AppError {
//   export class UnexpectedError extends Result<UseCaseError> {
//     public constructor (err: any) {
//       super(false, {
//         message: `An unexpected error occurred.`,
//         error: err
//       } as UseCaseError)
//       console.log(`[AppError]: An unexpected error occurred`);
//       console.error(err);
//     }

//     public static create (err: any): UnexpectedError {
//       return new UnexpectedError(err);
//     }
//   }

//   export class InputError extends Result<UseCaseError> {
//     public constructor(err: any) {
//         super(false, {
//             message: `${err}`,
//             error: err,
//         } as UseCaseError);
//         // logger.error(`InputError`, { err });
//         console.error(`InputError`, { err })
//     }
// }
// }

import logger from "../core/Logger";
import { slackNotify } from "../service.ts/slackService";
import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any, useCase: string, data: any) {
        super(false, {
            message: "An unexpected error occured.",
            error: err,
        } as UseCaseError);
        logger.error(`AppError`, {
            useCase,
            err,
            data,
        });
        slackNotify(`
        UnexpectedError: ${useCase},
        data: ${JSON.stringify(data, null, "\t")}
        err: ${JSON.stringify(err, null, "\t")},
      `);
    }
}
export class PermissionsError extends Result<UseCaseError> {
    public constructor(
        useCase: string,
        userId: string,
        forOrganization?: string
    ) {
        super(false, {
            message: `You do not have authorization for ${useCase}`,
        } as UseCaseError);
        logger.error(`PermissionError`, {
            data: {
                useCase,
                userId,
                forOrganization,
            },
        });
    }
}

export class InputError extends Result<UseCaseError> {
    public constructor(err: any) {
        super(false, {
            message: `${err}`,
            error: err,
        } as UseCaseError);
        logger.error(`InputError`, { err });
    }
}
