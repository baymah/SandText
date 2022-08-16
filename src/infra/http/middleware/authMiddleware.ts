import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../modules/iam/service/authService";
import { FetchRequestUser } from "../../../modules/iam/useCases/fetchRequestUser/fetchRequestUser";

export class AuthMiddleware {
    constructor(
        private authService: AuthService,
        private fetchRequestUserByUserId: FetchRequestUser
    ) {}

    private endRequest(
        res: Response,
        success:boolean,
        message: any,
        status: 401 | 500 | 403
    ) {
        return res.status(status).json({success, message });
    }

    private getJWTFromBearerToken(bearerToken: string): string {
        // return bearerToken.split(" ")[1];
        return bearerToken.includes('Bearer') !== undefined ? bearerToken.replace('Bearer', '') : bearerToken;
    }

    authenticate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            // Get jwt from Auth Header
            const token = this.getJWTFromBearerToken(
                req.headers["authorization"] || ""
            );
            // Confirm that the token was signed with our signature.
            if (token) {
                const decoded = await this.authService.decodeJWT(token);

                if (!decoded) {
                    return this.endRequest(
                        res,
                        false,
                        "Token signature expired.",
                        401
                    );
                }

                // See if the token was found
                console.log(decoded,"DECODE:")
                const { userId } = decoded;
                const tokens = await this.authService.getTokens(userId);

                // if the token was found, just continue the request.
                if (!tokens.length) {
                    return this.endRequest(
                        res,
                        false,
                        "Auth token not found, user is probably not logged in, please login again.",
                        403
                    );
                }
                // If Token, Get full User Details
                const result = await this.fetchRequestUserByUserId.execute(
                    decoded
                );
                console.log(result,"Result")
                if (result.isRight()) {
                    const requestUser = result.value.getValue();
                    req.requestUser = requestUser;
                    return next();
                } else {
                    // return this.endRequest(res,false, "Error Authenticating", 500);
                    return this.endRequest(res,false,result.value.error,500);
                }
            } else {
                return this.endRequest(res,false, "No access token provided", 403);
            }
        };
    }
}