import { Request, Response, NextFunction } from 'express';
import { Activity_Types } from '../infra/database/typeorm/entity/Activity_Type';

export const createActivityType = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { name, slug, description } = req.body;
        const data = { name, slug, description };
        const activity_type = await Activity_Types.create(data).save();
        return res.status(200).json({ success: true, data: activity_type })
    } catch (error: any) {
        return res.send(400).json({ success: false, error: error.message });
    }
};
