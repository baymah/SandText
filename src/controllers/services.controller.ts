import { NextFunction, Request, Response, } from "express";
import { createServiceType, serviceDetailsDTOSchema, serviceImplemenationDTOSchema, serviceInterface } from "../Dtos/ServiceDTO";
import { joiValidate } from "../utils/validator";
import {ServicesService} from '../services/servicesService'
import Joi from "joi";

export const createService = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<createServiceType>(serviceImplemenationDTOSchema, req.body);
        if (error){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.details[0].message,
            })
        }
        return new ServicesService().createService(vRequest).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });

    } catch (error: any) {
        return res.send().json({ success: false, error: error });
    }
}

export const getService = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<string>(Joi.string().required(), req.params.service_id);
        if (error){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.details[0].message,
            });
        }
        const service_id = vRequest
        return new ServicesService().getService(service_id).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });

    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}

export const updateService = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<serviceInterface>(serviceDetailsDTOSchema, req.body);
        if (error){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.details[0].message,
            });
        }
        const { error: error1, value: vRequest1 } = joiValidate<string>(Joi.string().required(), req.params.service_id);
        if (error1){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error1.details[0].message,
            });
        }
        const service_details = vRequest
        const service_id = vRequest1
        return new ServicesService().updateServiceDetails(service_id, service_details).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}


export const saveServicePictures = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error: error1, value: vRequest } = joiValidate<string>(Joi.string().required(), req.params.service_id);
        if (error1){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error1.details[0].message,
            });
        }
        const pictures: any[]= req.files as any[]
        const service_id = vRequest
        return new ServicesService().saveServicePictures(pictures, service_id).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });

    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}

export const deleteService = async (req: Request, res: Response, _next: NextFunction) => { 
    try {
        const { error: error1, value: vRequest } = joiValidate<string>(Joi.string().required(), req.params.service_id);
        if (error1){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error1.details[0].message,
            });
        }
        const service_id = vRequest
        return new ServicesService().deleteService(service_id).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });

    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}

export const getAllServices = async (_req: Request, res: Response, _next: NextFunction) => { 
    try {
        return new ServicesService().getAllServices().then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }

}
    

export const getAllServicesByUserId = async (req: Request, res: Response, _next: NextFunction) => { 
    try {
        const { error: error1, value: vRequest } = joiValidate<string>(Joi.string().required(), req.params.user_id);
        if (error1){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error1.details[0].message,
            });
        }
        console.log(req.params.user_id, "req*************")
        // return res.json({data: "data"})
        const user_id = vRequest
        return new ServicesService().getAllServicesByUserId(user_id).then((result) => {
            return res.json({ success: true, data: result });
        }).catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}

export const serachForService = async (req: Request, res: Response, _next: NextFunction) => { 
    try {
        const { error: error1, value: vRequest } = joiValidate<string>(Joi.string().required(), req.body.search_term);
        if (error1){
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error1.details[0].message,
            });
        }
        const search_term = vRequest
        return new ServicesService().getServicesBySearchTerm(search_term).then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}

