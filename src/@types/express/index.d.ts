import { RequestUserDTO } from "../../shared/utils/permissions";
declare global {
    namespace Express {
        interface Request {
            requestUser?: RequestUserDTO;
            error?: Error;
            userRequest?:any;
            fileValidationError?:any
            accessToken?: string;
        }
    }
}
