import Joi, { string } from "joi";

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export const CreateUserDTOSchema = Joi.object<CreateUserDTO>({
    username: Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
});
