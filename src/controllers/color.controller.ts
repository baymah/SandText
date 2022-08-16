import { Request, Response } from 'express';
import { IColorOutput } from '../interfaces/color.interface';
import { ColorDTO, ColorDTOSchema } from '../Dtos/ColorDto';
import { ColorService } from '../services/color.service';
import { joiValidate } from '../utils/validator';

const getAllColors = async (_req: Request, res: Response) => {
    try {
        const colorservice = new ColorService();
        const colors: IColorOutput[] = await colorservice.getAllColor();
        return res.status(200).json({ success: true, message: 'Color fetch successfully.', data: colors });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
const saveColor = async (req: Request, res: Response) => {
    try {
        //valide Request body
        const { error, value: vRequest } = joiValidate<ColorDTO>(ColorDTOSchema, req.body);
        if (error)
            return res.status(200).send({
                success: false,
                message: 'Color validation(s) error',
                error: error.message,
            });

        const colorService = new ColorService();
        const result = await colorService.CreateColor(vRequest);
        if (!result) return res.status(200).json({ success: false, message: 'Color name already exist' });
        return res.status(200).json({ success: true, message: 'Color successfuly added to database.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
 const getAllColorsDeprecated = async (_req: any, res: any, _next: any) => {
    try {
        return await new ColorService()
            .getAllColors()
            .then((result) => {
                return res.json({ success: true, data: result });
            })
            .catch((error) => {
                return res.json({ success: false, data: error });
            });
    } catch (error: any) {
        return res.sendStatus(400).json({ success: false, error: error.message });
    }
};

export { saveColor, getAllColors ,getAllColorsDeprecated};
