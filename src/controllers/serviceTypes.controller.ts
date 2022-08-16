import { NextFunction, Request, Response, } from "express";
import { ServiceTypesService } from "../services/serviceTypes";


export const getAllServiceTypes = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        return new ServiceTypesService().getAll().then((result: any) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}