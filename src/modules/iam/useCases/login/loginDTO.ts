import { JWTToken, RefreshToken } from "../../domain/valueObjects/jwt";

export interface LoginDTO {
    email: string;
    password: string;
    ip?: string;
}

export interface LoginDTOResponse {
    accessToken: JWTToken;
    refreshToken: RefreshToken;
}
