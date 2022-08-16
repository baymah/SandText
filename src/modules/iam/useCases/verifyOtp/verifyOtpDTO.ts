export interface VerifyOtpDTO {
    email: string;
    otp: number;
    requestUser: RequestUserDTO;
}

export interface VerifyOtpDTOResponse {
    accessToken:string
    refreshToken:string
}

export const defaultRequestUser: RequestUserDTO = {
    userId: "me",
};
