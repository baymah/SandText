import { Request, Response } from 'express'
import { ProductService } from '../services/ProductService/product.service'
import { CommentService } from '../services/comment.service'
import { VideoCommentService } from '../services/video.comment.service'
// import { VideoService } from '../services/videos.service'
import { getPromotionalVideoById } from '../services/promotional_video.service'

const addCommentToProduct = async (req: Request, res: Response) => {
    try {
        const user = req.requestUser
        const comment: string = req.body
        const productService = new ProductService()
        const commentService = new CommentService()
        const { productId } = req.params
        const product = await productService.getById(productId)
        // create the comment and add its product id and go cool...

        if (!product) return res.status(400).json({ message: 'Product not found' })

        await commentService.createProductComment(user, comment, product)

        return res
            .status(200)
            .json({ success: true, message: 'Comment successfully added.', data: product })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}
// const addCommentToVideo = async (req: Request, res: Response) => {
//     try {
//         const user = req.requestUser
//         const comment: string = req.body
//         const videoService = new VideoService()
//         const videoCommentService = new VideoCommentService()
//         const { videoId } = req.params
//         const video = await videoService.getVideoById(videoId)
//         // const video = await videoCommentService.getById(videoId)

//         if (!video) return res.status(400).json({ message: 'video not found' })

//         const result = await videoCommentService.createVideoComment(user, comment, video)
//         if (!result)
//             return res.status(200).json({ success: false, message: 'Error adding the comment' })

//         return res
//             .status(200)
//             .json({ success: true, message: 'Comment successfuly added to video.', data: null })
//     } catch (err: any) {
//         return res.status(400).json({ success: false, message: err.message, error: err })
//     }
// }


const getAllComment = async (_req: Request, res: Response) => {
    try {
        const commentService = new CommentService()
        const comments = await commentService.getAllComment()

        return res
            .status(200)
            .json({ success: true, message: 'Comments fetch successfully.', data: comments })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}
// const getAllVideoComment = async (_req: Request, res: Response) => {
//     try {
//         const videoCommentService = new VideoCommentService()
//         const videoComments = await videoCommentService.getAllComment()
        

//         if (!videoComments)
//             return res.status(400).json({ success: false, message: 'Error fetching the video commets' })
//         return res.status(200).json({
//             success: true,
//             message: 'Video Comments fetch successfully.',
//             data: videoComments,
//         })
//     } catch (err: any) {
//         return res.status(400).json({ success: false, message: err.message, error: err })
//     }
// }
const getAllPromotionalVideoComment = async (_req: Request, res: Response) => {
    try {
        const videoCommentService = new VideoCommentService()
        const videoComments = await videoCommentService.getAllPromotionalVideoComment()
        

        if (!videoComments)
            return res.status(400).json({ success: false, message: 'Error fetching the video commets' })
        return res.status(200).json({
            success: true,
            message: 'Video Comments fetch successfully.',
            data: videoComments,
        })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}
const getProductComments = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const commentService = new CommentService()
        const comments = await commentService.getProductComments(productId)

        return res
            .status(200)
            .json({ success: true, message: 'Comments fetch successfully.', data: comments })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}
// const getVideoCommentsById = async (req: Request, res: Response) => {
//     try {
//         const { videoId } = req.params
//         const videoCommentService = new VideoCommentService()
//         const videoComments = await videoCommentService.getByVideoId(videoId)
//         if(!videoComments) return res.status(200).json({success:false,message:'No video comment found.'})

//         return res.status(200).json({
//             success: true,
//             message: 'Video Comments fetch successfully.',
//             data: videoComments,
//         })
//     } catch (err: any) {
//         return res.status(400).json({ success: false, message: err.message, error: err })
//     }
// }
const getPromoVideoCommentsById = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params
        const videoCommentService = new VideoCommentService()
        const videoComments = await videoCommentService.getPromoByVideoId(videoId)
        if(!videoComments) return res.status(200).json({success:false,message:'No video comment found.'})

        return res.status(200).json({
            success: true,
            message: 'Video Comments fetch successfully.',
            data: videoComments,
        })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}

const getProductCommentCount = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const commentService = new CommentService()
        const productCommentsCount = await commentService.getProductCommentsCount(productId)

        return res.status(200).json({
            success: true,
            message: `Product Comment's count fetch successfully.`,
            data: productCommentsCount,
        })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}
// const getVideoCommentCount = async (req: Request, res: Response) => {
//     try {
//         const { videoId } = req.params
//         const videoCommentService = new VideoCommentService()
//         const videoCommentsCount = await videoCommentService.getVideoCommentsCount(videoId)

//         return res.status(200).json({
//             success: true,
//             message: `Video Comment's count fetch successfully.`,
//             data: videoCommentsCount,
//         })
//     } catch (err: any) {
//         return res.status(400).json({ success: false, message: err.message, error: err })
//     }
// }
const getPromoVideoCommentCount = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params
        const videoCommentService = new VideoCommentService()
        const videoCommentsCount = await videoCommentService.getPromoVideoCommentCount(videoId)

        return res.status(200).json({
            success: true,
            message: `Video Comment's count fetch successfully.`,
            data: videoCommentsCount,
        })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}

const addCommentToPromotionalVideo = async (req: Request, res: Response) => {
    try {
        const user = req.requestUser
        const comment: string = req.body
        // const videoService = n()
        const videoCommentService = new VideoCommentService()
        const { videoId } = req.params
        const video = await getPromotionalVideoById(videoId)
        // const video = await videoCommentService.getById(videoId)

        if (!video) return res.status(400).json({ message: 'video not found' })

        const result = await videoCommentService.createPromotionalVideoComment(user, comment, video)
        if (!result)
            return res.status(200).json({ success: false, message: 'Error adding the comment' })

        return res
            .status(200)
            .json({ success: true, message: 'Comment successfuly added to video.'})
            // .json({ success: true, message: 'Comment successfuly added to video.', data: null })
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err })
    }
}

export {
    getAllComment,
    // getVideoCommentsById,
    getPromoVideoCommentsById,
    // addCommentToVideo,
    // getAllVideoComment,
    getProductComments,
    addCommentToProduct,
    // getVideoCommentCount,
    getProductCommentCount,
    getAllPromotionalVideoComment,
    getPromoVideoCommentCount,
    addCommentToPromotionalVideo
}
