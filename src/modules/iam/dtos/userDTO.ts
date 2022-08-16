export interface UserDTO {
    email: string;
    userId: string;
}

export type VerificationStatus={
    NotVerify:0,
    Verified:1
}

export const VerificationStatus = {
    NotVerified: 0,
    Verified: 1,
} as const;