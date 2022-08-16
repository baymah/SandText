import { Request, Response } from 'express';
import { HttpResponse } from '../utils/ResponseType';
import {
    createPromotionalVideo,
    getPromotionalVideo,
    getPromotionalVideoWithProducts,
} from '../services/promotional_video.service';
import { joiValidate } from '../utils/validator';
import { CreatePromotionalVideoDTO, CreatePromotionalVideoDTOSchema } from '../Dtos/CreatePromotionalVideoDto';
import { SubCategoryService } from '../services/subCategory.service';

const createPromoVideo = async (req: Request, res: Response) => {
    const { error, value: vRequest } = joiValidate<CreatePromotionalVideoDTO>(
        CreatePromotionalVideoDTOSchema,
        req.body,
    );
    if (error)
        HttpResponse.BAD_REQUEST(res, {
            success: false,
            message: 'Validation(s) error',
            error: error.message,
        });
    try {
        const subCategoryservice = new SubCategoryService();
        const subCategory = await subCategoryservice.getById(vRequest.subCategoryId);
        if (!subCategory) HttpResponse.BAD_REQUEST(res, 'Subcategory Not Found');
        const payload = {
            product_id: JSON.stringify(vRequest.productId),
            user_id: '7c647f3f-9cfc-409a-80cf-3b6a32fcbcb6',
            video_url: vRequest.videoUrl,
            category_id: vRequest.categoryId,
            subCategory: subCategory,
        };
        await createPromotionalVideo(payload);
        HttpResponse.CREATED(res, 'Promotional video created');
    } catch (err: any) {
        HttpResponse.CATCH_BAD_REQUEST(res, err.message);
    }
};
const getPromoVideo = async (req: Request, res: Response) => {
    try {
        const promotionalVideos = await getPromotionalVideo(Number(req.params.page), Number(req.params.take), '');
        return HttpResponse.OK(res, promotionalVideos);
    } catch (err: any) {
        HttpResponse.CATCH_BAD_REQUEST(res, err.message);
    }
};

const getPromoVideoProduct = async (req: Request, res: Response) => {
    try {
        const promotionalVideos = await getPromotionalVideoWithProducts(req.params.videoId);
        return HttpResponse.OK(res, promotionalVideos);
    } catch (err: any) {
        HttpResponse.CATCH_BAD_REQUEST(res, err.message);
    }
};

export { createPromoVideo, getPromoVideo, getPromoVideoProduct };
