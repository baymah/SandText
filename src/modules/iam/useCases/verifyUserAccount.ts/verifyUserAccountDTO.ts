// import { RequestUserDTO } from "../../../../shared/utils/permissions";

import { VerificationStatus } from "../../dtos/userDTO";

export interface VerifyUserAccountDTO {
    userId: string;
    verificationStatus: number;
}

export interface VerifyUserAccountResponse{
    id:string
}
