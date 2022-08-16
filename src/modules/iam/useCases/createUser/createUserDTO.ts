import Joi from "joi";

export interface CreateUserDTO {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    requestUser: RequestUserDTO;
}

export const CreateUserDTOSchema = Joi.object<CreateUserDTO>({
    email: Joi.string().required(),
    password: Joi.string().min(7).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
}).unknown();

export interface RegisterDTOResponse {
    email: string;
    otp: number;
}

export const defaultRequestUser: RequestUserDTO = {
    userId: "me",
    // state: "active",
};
