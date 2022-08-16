import { NextFunction, Request, Response, } from "express";
import { ServicePlansService } from "../services/servicePlans";

export const getAllServicePlans = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        return new ServicePlansService().getAll().then((result) => {
            return res.json({ success: true, data: result });
        })
        .catch((error: any) => {
            return res.json({ success: false, data: error });
        });
    } catch (error) {
        return res.send().json({ success: false, error: error });
    }
}