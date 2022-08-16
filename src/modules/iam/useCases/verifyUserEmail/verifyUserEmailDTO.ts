// import { RequestUserDTO } from "../../../../shared/utils/permissions";

export interface VerifyUserEmailDTO {
    userId: string;
    token: string;
    requestUser: RequestUserDTO;
}
