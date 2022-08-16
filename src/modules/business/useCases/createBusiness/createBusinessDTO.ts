import Joi from "joi";

export interface CreateBusinessDTO {
    businessEmail:string;
    businessName:string,
    location:string,
    position:string,
    videoRange:string,
    uploadFrequency:string	
    requestUser?: RequestUserDTO;
}

export const CreateBusinessDTOSchema = Joi.object<CreateBusinessDTO>({
    businessEmail: Joi.string().required(),
    businessName: Joi.string().required(),
    location: Joi.string().required(),
    position: Joi.string().required(),
    videoRange: Joi.string().required(),
    uploadFrequency: Joi.string().required(),

}).unknown();

export interface RegisterDTOResponse {
    email: string;
    otp: number;
}

export const defaultRequestUser: RequestUserDTO = {
    userId: "me",
    // state: "active",
};
