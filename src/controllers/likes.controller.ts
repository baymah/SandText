import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService/product.service';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/likeService';
import { VideoService } from '../services/videos.service';

const addCommentToProduct = async (req: Request, res: Response) => {
    try {
        const user = req.requestUser;
        const comment: string = req.body;
        const productService = new ProductService();
        const commentService = new CommentService();
        const { productId } = req.params;
        const product = await productService.getById(productId);
        // create the comment and add its product id and go cool...

        if (!product) return res.status(400).json({ message: 'product not found' });

        await commentService.createProductComment(user, comment, product);

        return res.status(200).json({ success: true, message: 'Product found.', data: product });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const likeProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const user = req.requestUser;
        const likeService = new LikeService();
        const userLikedProduct = await likeService.getASpecificProductLikedByUser(user, productId);
        if (userLikedProduct?.length > 0) return res.json({ message: 'product already liked by the user...' });
        await likeService.likeProduct(user, productId);
        return res.status(200).json({ success: true, message: 'Product liked.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const likeVideo = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        // const user = req.requestUser;
        const videoService = new VideoService();
        const result = await videoService.getVideoById(videoId);
        if (!result) res.status(400).json({ success: false, message: 'Product video not found' });
        // const likeService = new LikeService();

        // await likeService.likeVideo(user, videoId);
        return res.status(200).json({ success: true, message: 'Video liked::.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const disLikeProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const user = req.requestUser;
        const likeService = new LikeService();
        const userDislikedProduct = await likeService.getASpecificProductDislikedByUser(user, productId);

        if (userDislikedProduct?.length > 0)
            return res.json({ success: false, message: 'Product already disliked by the user...' });
        // await likeService.dislikeProduct(user, productId);
        return res.status(200).json({ success: true, message: 'Product disliked.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
const disLikeVideo = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const user = req.requestUser;
        //check if video exist
        const videoService = new VideoService();
        const result = await videoService.getVideoById(videoId);
        if (!result) return res.status(400).json({ success: false, message: 'Product video not found' });
        const likeService = new LikeService();
        //check if user already like the video
        const userDislikedVideo = await likeService.getASpecificVideoDislikedByUser(user, videoId);
        if (userDislikedVideo?.length > 0)
            return res.json({ success: false, message: 'Video already disliked by the user' });
        // await likeService.dislikeVideo(user, videoId);
        return res.status(200).json({ success: true, message: 'Video disliked.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const getAllComment = async (_req: Request, res: Response) => {
    try {
        const commentService = new CommentService();
        const comments = await commentService.getAllComment();

        return res.status(200).json({ success: true, message: 'Comments fetch successfully.', data: comments });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
const getProductComments = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const commentService = new CommentService();
        const comments = await commentService.getProductComments(productId);

        return res.status(200).json({ success: true, message: 'Comments fetch successfully.', data: comments });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const getProductLikeCount = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const likeService = new LikeService();
        const productLikesCount = await likeService.getProductLikeCount(productId);

        return res.status(200).json({
            success: true,
            message: `Product Like's count fetch successfully.`,
            data: productLikesCount,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
const getVideoLikeCount = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const videoService = new VideoService();
        const result = await videoService.getVideoById(videoId);
        if (!result) return res.status(400).json({ success: false, message: 'Product video not found' });
        // const likeService = new LikeService();
        // const videoLikesCount = await likeService.getVideoLikeCount(videoId);

        return res.status(200).json({
            success: true,
            message: `Video Like's count fetch successfully.`,
            // data: videoLikesCount,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const getPromoVideoLikeCount = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const videoService = new VideoService();
        const result = await videoService.getPromoVideoById(videoId);
        if (!result) return res.status(400).json({ success: false, message: 'Product video not found' });
        const likeService = new LikeService();
        const videoLikesCount = await likeService.getPromoVideoLikeCount(videoId);

        return res.status(200).json({
            success: true,
            message: `Video Like's count fetch successfully.`,
            data: videoLikesCount,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const getProductDisLikeCount = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const likeService = new LikeService();
        const productDisLikesCount = await likeService.getProductDisLikeCount(productId);

        return res.status(200).json({
            success: true,
            message: `Product Dislike's count fetch successfully.`,
            data: productDisLikesCount,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};
const getVideoDisLikeCount = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const videoService = new VideoService();
        const result = await videoService.getVideoById(videoId);
        if (!result) return res.status(400).json({ success: false, message: 'Product video not found' });
        // const likeService = new LikeService();
        // const videoDisLikesCount = await likeService.getVideoDisLikeCount(videoId);

        return res.status(200).json({
            success: true,
            message: `Video Dislike's count fetch successfully.`,
            // data: videoDisLikesCount,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const likePromoVideo = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const user = req.requestUser;
        const videoService = new VideoService();
        const result = await videoService.getPromoVideoById(videoId);
        // const result = await videoService.getVideoById(videoId);
        console.log(result,"Didi you get promo video:::")
        if (!result) res.status(400).json({ success: false, message: 'Product video not found' });
        const likeService = new LikeService();
        // const userLikedVideo = await likeService.getASpecificVideoLikedByUser(user, videoId);
        // console.log(userLikedVideo, 'liked status in controller:::');
        // if (userLikedVideo) return res.json({ message: 'Video already liked by the user...' });
        console.log(user,videoId,"USER AND PROMO VIDEO TO LIKE?")
        await likeService.likePromoVideo(user, videoId);
        return res.status(200).json({ success: true, message: 'Video liked.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

const disLikePromoVideo = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const user = req.requestUser;
        // const videoService = new VideoService();
        // const result = await videoService.getVideoById(videoId);
        // if (!result) return res.status(400).json({ success: false, message: 'Product video not found' });
        const likeService = new LikeService();
        const userDislikedVideo = await likeService.getASpecificVideoDislikedByUser(user, videoId);
        if (userDislikedVideo?.length > 0)
            return res.json({ success: false, message: 'Promo video already disliked by the user' });
        // await likeService.dislikeVideo(user, videoId);
        return res.status(200).json({ success: true, message: 'Video disliked.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

export {
    likePromoVideo,
    likeVideo,
    likeProduct,
    disLikeVideo,
    disLikePromoVideo,
    getAllComment,
    disLikeProduct,
    getVideoLikeCount,
    // addCommentToVideo,
    getPromoVideoLikeCount,
    getProductComments,
    getProductLikeCount,
    addCommentToProduct,
    getVideoDisLikeCount,
    getProductDisLikeCount,
};
