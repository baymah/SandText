import { TagsDTOSchema, updateDTO, UpdateDTOSchema, videoIDSchema, VideoIdSchema } from "../Dtos/GeneratedTagsDTO";
import { videoTagDTO } from "../repository/generatedVideoTagRepo";
import { joiValidate } from "../utils/validator";
import { Request, Response, NextFunction } from 'express';
import { GeneratedTagsService } from "../services/generaetdTags.service";


export const saveVideoTags = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<videoTagDTO[]>(TagsDTOSchema, req.body);
        if (error)
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });

        const tags = vRequest;
        return await new GeneratedTagsService().saveTagsForVideo(tags).then((result) => {
            res.status(200).json({ success: true, data: result });
        }).catch((error) => {
            res.status(200).json({ success: false, data: error });
        })
    } catch (error: any) {
        return res.send(400).json({ success: false, error: error.message });
    }
};

export const getAllVideoTags = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<videoIDSchema>(VideoIdSchema, req.params);
        if (error)
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });

        const {video_id} = vRequest;
        
        return await new GeneratedTagsService().getAllVideoTags(video_id).then((result) => {
            res.status(200).json({ success: true, data: result });
        }).catch((error) => {
            res.status(200).json({ success: false, data: error });
        })

    } catch (error: any) {
        return res.send(400).json({ success: false, error: error.message });
    }
}

export const updateVideotags = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<updateDTO>(UpdateDTOSchema, req.body);
        if (error)
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });

        let { video_id, product_id, price, label } = vRequest;
        // price = Number(price)
         return await new GeneratedTagsService().updateVideoTags(video_id, product_id, Number(price), label).then((result) => {
             res.status(200).json({ success: true, data: result });
         }).catch((error) => {
             res.status(200).json({ success: false, data: error });
         })
       
    } catch (error: any) {
        return res.send(400).json({ success: false, error: error.message });
    }
}

export const deleteVideotags = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { error, value: vRequest } = joiValidate<videoIDSchema>(VideoIdSchema, req.params);
        if (error)
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });

        const { video_id } = vRequest;
        return await new GeneratedTagsService()
            .deleteVideoTags(video_id)
            .then((result) => {
                res.status(200).json({ success: true, data: result });
            })
            .catch((error) => {
                res.status(200).json({ success: false, data: error });
            });
    } catch (error: any) {
        return res.send(400).json({ success: false, error: error.message });
    }
}