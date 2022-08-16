import { Request, Response } from 'express';
// import { Category } from '../infra/database/typeorm/entity/Category';
const { writeFile } = require('fs');
// import { SubCategory } from '../infra/database/typeorm/entity/SubCategory';
import { generaedTagsRepo, productPictureRepo, productVideoRepo } from '../repository';
// import { categoryRepo, generaedTagsRepo, productPictureRepo, productVideoRepo, subCategoryRepo } from '../repository';
import { PromotionalVideoRepository } from '../repository/implementations/promotional_videos';
import { ProductService } from '../services/ProductService/product.service';
import { s3VideoUpload } from '../services/s3Service';
import { VideoService } from '../services/videos.service';
import { getPegsByVideoId } from '../services/pegg.service';
// import { getPegsByVideoId } from '../services/pegg.service';
import { s3 } from '../third_party_config/asw_config';
import UserActivitiesServices from '../services/UserActivitiesService';
import { UserRepo } from '../user/src/management/repository/user.repository';
import { asyncRedisClient } from '../infra/redis';
// import { any } from 'joi';

const list = async (req: any, res: any) => {
    try {
        const videoService = new VideoService();
        let video = await videoService.getAllVideos();
        if (!video)
            return res.status(200).json({
                success: false,
                error: 'Video not found',
            });
        const mappedVideo = await Promise.all(
            video.map(async (videoObj: any) => {
                // let videoPeggs = await getPegsByVideoId(videoObj.id);
                let productCount = (await getPegsByVideoId(videoObj.id)).length;
                // let productVideo = await new ProductService().getProductByVideoIdWithNoRelation(videoObj.id);
                const { id, video, title, description, json, categories, thumbnail, video_aspect_ratio } = videoObj;
                return {
                    video: JSON.parse(video),
                    videoTitle: title ? title : 'Killer Bee',
                    thumbnail: thumbnail ? thumbnail : '',
                    video_aspect_ratio: video_aspect_ratio ? video_aspect_ratio : '',
                    videoDescription: description ? description : 'Lord Killer bee destroying Sasuke',
                    likesCount: videoObj.likes ? videoObj.likes.length : 0,
                    commentsCount: videoObj.product_video_comment ? videoObj.product_video_comment.length : 0,
                    // json: videoPeggs.length>0?{
                    //   frameRate: videoPeggs.length > 0 ? videoPeggs[0].frame_rate : 0,
                    //   duration: videoPeggs.length > 0 ? videoPeggs[0].duration : 0,
                    //   label: videoPeggs.map((pegg) => {
                    //     return {
                    //       label: pegg.label,
                    //       confidence: pegg.confidence,
                    //       id: pegg.video_id,
                    //       price: pegg.price,
                    //       description: pegg.description,
                    //       boundingBoxHeight: pegg.boundingBoxHeight,
                    //       boundingBoxWidth: pegg.boundingBoxWidth,
                    //       boundingBoxTop: pegg.boundingBoxTop,
                    //       boundingBoxLeft: pegg.boundingBoxLeft,
                    //       millisecond:pegg.millisecond
                    //     };
                    //   }),
                    // }:"",
                    json,
                    categoryId: categories.length > 0 ? categories[0].id : '2fd2c479-64ca-4961-bcdd-7d539ff4d281',
                    id,
                    // productCount: productVideo.length,
                    productCount: productCount,
                    userImage: '',
                    likedVideo: true,
                    cartItemCount: 0,
                };
            }),
        );
        if (req.body.user_id) {
            const userActivitiesService = new UserActivitiesServices();
            await userActivitiesService.create({
                user_id: req.body?.user_id,
                platform: req.headers.portal,
                activity: 'View Video',
                type: 'View Video',
                city: 'Lagos',
                region: 'Ikoyi',
                country: 'Nigeria',
                latitude: '6.45305560',
                longitude: '3.43555560',
                status: 1,
            });
        }
        return res.json({ data: mappedVideo });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const listVideoPegs = async (req: any, res: any) => {
    try {
        const promotionalVideoRepository = new PromotionalVideoRepository();
        const productService = new ProductService();
        const {promotionalVideoRecords} = await promotionalVideoRepository.getPromotionalVideos({take:req.query.take,page:req.query.page});
        const promoVideo = await Promise.all(
            promotionalVideoRecords.map(async (pv: any) => {
                if (!pv.product_id)
                    return {
                        id: pv.id,
                        video_url: pv.video_link,
                        // video_url: JSON.parse(pv.video_url),
                        // videoDescription: pv.description,
                        // caategory: pv.category,
                        // productCount: products.length,
                        products: [],
                        // commentsCount: pv.promo_video_comment.length,
                        // likesCount: pv.promotional_likes.length,
                    };
                else {
                    let productIds = JSON.parse(pv.product_id);
                    const products: any[] | null = await Promise.all(
                        productIds.map(async (id: any) => {
                            const product = await productService.getProductById(id);
                            if (!product) {
                                return undefined;
                            }

                            const productPicture = await productPictureRepo.getProductImageByProductId(id);
                            return {
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: product.price,
                                product_picture: productPicture,
                                // thumbnail: product.thumbnail,
                            };
                        }),
                    );
                    return {
                        id: pv.id,
                        // video_url: pv.video_url,
                        video_url: pv.video_link,
                        // videoDescription: pv.description,
                        // caategory: pv.category,
                        // productCount: products.length,
                        products: products,
                        // commentsCount: pv.promo_video_comment.length,
                        // likesCount: pv.promotional_likes.length,
                    };
                }
            }),
        );
        // return Promise.resolve({ ...promotionalVideoRecords, product_id: undefined, products });
        return res.json({ promoVideo });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const listPromotionalVideos = async (req: Request, res: Response) => {
    const videoCache= await asyncRedisClient.getOne(`take[${req.query.take}]:page[${req.query.page}]:[PromoVideo]`);
        if (videoCache) {
            return res.status(200).json({  message: 'Success',success: true,...JSON.parse(videoCache) });
        }
    let userLoginStatus = [];

    const promotionalVideoRepository = new PromotionalVideoRepository();
    const {promotionalVideoRecords, count} = await promotionalVideoRepository.getPromotionalVideos({take:req.query.take,page:req.query.page});
    const promoVideo = await Promise.all(
        promotionalVideoRecords.map(async (pv: any) => {
            // pv.user_id  //get user details with this
            const userRepo = new UserRepo();
            const user = await userRepo.getUserById(pv.user_id)

            // use redis here
            let videoTags = await generaedTagsRepo.getAllTagsByVideoIdNoPromise(pv.id);
            userLoginStatus = pv.promotional_likes.find((pv: any) => {
                return pv.user_id === 'wont-find-it' && pv.likes === 0;
            });
            return {
                id: pv.id,
                thumbnail: pv.thumbnail,
                video_aspect_ratio: pv.video_aspect_ratio,
                userImage: user ? user.picture : '',
                userName: user ? user.username : '',
                likedVideo: userLoginStatus ? Object.keys(userLoginStatus).length > 0 : false,
                // json: videoTags ? JSON.stringify({ label: videoTags }) : JSON.stringify({ label: '' }),
                json: videoTags ? JSON.stringify({ label: videoTags }) : JSON.stringify({ label: [] }),
                video: JSON.parse(pv.video),
                videoTitle: pv.title,
                categoryId: pv.category,
                videoDescription: pv.description ? pv.description : '',
                likesCount: pv.promotional_likes.length,
                // commentsCount: pv.promo_video_comment.length,
                // productCount: pv.product_id ? JSON.parse(pv.product_id).length : 0,
                productCount: pv.products ? pv.products.length : 0,
            };
        }),
    );

    // lets paginate this
    const paginatedData = paginateResponse(promoVideo, Number(req.query.page), Number(req.query.take), count);
    await asyncRedisClient.setex(`take[${req.query.take}]:page[${req.query.page}]:[PromoVideo]`, JSON.stringify(paginatedData));
    return res.status(200).json({  message: 'Success',success: true,...paginatedData });
};
const listPromotionalVideosPag = async (req: Request, res: Response) => {
    let userLoginStatus = [];

    const promotionalVideoRepository = new PromotionalVideoRepository();
    const promotionalVideoRecords = await promotionalVideoRepository.getAllPromotionalVideosPeg(
        Number(req.query.take),
        Number(req.query.page),
    );
    const promoVideo = await Promise.all(
        promotionalVideoRecords.map(async (pv: any) => {
            let videoTags = await generaedTagsRepo.getAllTagsByVideoIdNoPromise(pv.id);
            userLoginStatus = pv.promotional_likes.find((pv: any) => {
                return pv.user_id === 'wont-find-it' && pv.likes === 0;
            });
            return {
                id: pv.id,
                thumbnail: pv.thumbnail,
                video_aspect_ratio: pv.video_aspect_ratio,
                userImage: '',
                likedVideo: userLoginStatus ? Object.keys(userLoginStatus).length > 0 : false,
                // json: videoTags ? JSON.stringify({ label: videoTags }) : JSON.stringify({ label: '' }),
                json: videoTags ? JSON.stringify({ label: videoTags }) : { label: '' },
                video: JSON.parse(pv.video),
                videoTitle: pv.title,
                categoryId: pv.category,
                videoDescription: pv.description ? pv.description : '',
                likesCount: pv.promotional_likes.length,
                // commentsCount: pv.promo_video_comment.length,
                // productCount: pv.product_id ? JSON.parse(pv.product_id).length : 0,
                productCount: pv.products ? pv.products.length : 0,
            };
        }),
    );
    return res.status(200).json({ data: promoVideo })
};
const listPromotionalVideosForAuthorizedUser = async (req: Request, res: Response) => {
    let user = req.requestUser;
    let userLoginStatus = [];

    const promotionalVideoRepository = new PromotionalVideoRepository();
    const {promotionalVideoRecords} = await promotionalVideoRepository.getPromotionalVideos({take:req.query.take,page:req.query.page});
    const promoVideo = await Promise.all(
        promotionalVideoRecords.map(async (pv: any) => {
            let videoTags = await generaedTagsRepo.getAllTagsByVideoIdNoPromise(pv.id);
            userLoginStatus = pv.promotional_likes.find((pv: any) => {
                return pv.user_id === user.id && pv.likes === 1;
            });
            return {
                id: pv.id,
                thumbnail: pv.thumbnail,
                video_aspect_ratio: pv.video_aspect_ratio,
                userImage: '',
                userName: '',
                likedVideo: userLoginStatus ? Object.keys(userLoginStatus).length > 0 : false,
                json: videoTags ? JSON.stringify({ label: videoTags }) : JSON.stringify({ label: '' }),
                video: JSON.parse(pv.video),
                videoTitle: pv.title,
                categoryId: pv.category,
                videoDescription: pv.description ? pv.description : '',
                likesCount: pv.promotional_likes.length,
                commentsCount: pv.promo_video_comment.length,
                productCount: pv.product_id ? JSON.parse(pv.product_id).length : 0,
            };
        }),
    );
    return res.status(200).json({ data: promoVideo });
};
const updateVideo = async (req: any, res: any) => {
    const videoService = new VideoService();
    try {
        const video = req.video;
        video.json = req.body.jsonUrl;
        await videoService.update(video);
        res.send({
            success: true,
            message: 'Video updated successfully',
        });
    } catch (err) {
        return res.status(400).json({
            error: {
                success: false,
                error: err,
                message: 'Could not retrieve video',
            },
        });
    }
};

const remove = async (req: any, res: any) => {
    try {
        let video = req.video;
        const Key = `video${video.video.split('public')[1]}`;
        s3.deleteObject(
            {
                Key,
                Bucket: 'bucketeer-2d3a99a7-20b6-4150-8399-4a871f0932fb',
            },
            (error: any, data: any) => {
                if (error) return error;
                console.log(data, 'data,,,');
            },
        );
        res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

const videoByID = async (req: any, res: any, next: any, id: string) => {
    const videoService = new VideoService();
    try {
        let video = await videoService.getById(id);
        if (!video)
            return res.status(200).json({
                success: false,
                error: 'Video not found',
            });
        req.video = video;
        next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: 'Could not retrieve video',
        });
    }
};

const deleteVideo = async (_req: any, res: any) => {
    const videoService = new VideoService();
    try {
        let video = await videoService.delete();
        if (!video)
            return res.status(200).json({
                success: false,
                error: 'Video not found',
            });
        res.send({ message: 'Video deleted successfully' });
    } catch (err) {
        return res.status(400).json({
            error: {
                success: false,
                error: err,
                message: 'Could not retrieve video',
            },
        });
    }
};

const uploadVideo = async (req: any, res: any) => {
    try {
        const { categoryId } = req.body;

        if (!(req.file || categoryId))
            return res.status(400).json({
                success: false,
                message: 'Video and CategoryId required',
            });
        const file = req.file;

        return await new VideoService()
            // .fmmpegTerminalScript()
            .uploadVideo(file)
            .then((_result) => {
                res.status(201).send({
                    success: true,
                    message: `AWS_S3_SUCCESS: ${'result.Location'}`,
                });
            })
            .catch((error) => {
                console.log('AWS_S3_ERROR', {
                    error,
                    process: 'upload',
                });
                res.status(400).json({
                    message: 'AWS_S3_ERROR',
                    status: false,
                    error,
                    process: 'upload',
                });
            });
    } catch (err) {
        console.log('AWS_S3_ERROR', { err, process: 'upload' });
        res.status(400).json({
            message: 'AWS_S3_ERROR',
            status: false,
            err,
            process: 'upload',
        });
    }
};

const uploadMp4Video = async (req: any, res: any) => {
    try {
        let { categoryId, subCategoryId, title, description } = req.body;
        // console.log(req.body, 'req.body');
        if (!(req.file || categoryId || subCategoryId, title, description))
            return res.status(400).json({
                success: false,
                message: 'Video or CategoryId or subCategoryId or title or description is missing',
            });
        const file = req.file;
        console.log([categoryId], 'typeof categoryId');
        let cartegoryArr = [];
        let subCartegoryArr = [];
        if (!Array.isArray(categoryId)) {
            cartegoryArr.push(categoryId);
        } else if (Array.isArray(categoryId)) {
            cartegoryArr = [...categoryId];
        }
        if (!Array.isArray(subCategoryId)) {
            subCartegoryArr.push(subCategoryId);
        } else if (Array.isArray(subCategoryId)) {
            subCartegoryArr = [...subCategoryId];
        }

        // const catGorise: Category[] | null = await Promise.all(
        //     cartegoryArr.map(async (catId: any) => {
        //         const category = await categoryRepo.getCategoryById(catId);
        //         if (!category) {
        //             return undefined;
        //         }
        //         return category;
        //     }),
        // );
        // const subCategory: SubCategory[] | null = await Promise.all(
        //     subCartegoryArr.map(async (subCatId: any) => {
        //         const subCategory = await subCategoryRepo.getSubCategoryById(subCatId);
        //         if (!subCategory) {
        //             return undefined;
        //         }
        //         return subCategory;
        //     }),
        // );
        // console.log(catGorise, 'categories...');

        const uploadResult = await s3VideoUpload(file);
        console.log(uploadResult, 'uploadResult');
        const videoService = new VideoService();
        const instance = await videoService.instantiate({
            title,
            description,
            video: '',
            mp4_url: uploadResult.Location,
            json: '',
        });
        const savedVideo = await productVideoRepo.save(instance);
        console.log(savedVideo, 'savedVideo');
        // //Todo save the relationships...
        // const result = await videoService.addToCategory(savedVideo.id, catGorise, subCategory);

        // calling the convert to m3u8 service
        //   const m3u8Url =  await new VideoService()
        //     .uploadVideo(file)
        //     .then((_result) => {
        //       res.status(201).send({
        //         success: true,
        //         message: `AWS_S3_SUCCESS: ${"result.Location"}`,
        //       });
        //     });

        //////////////////
        //include the call to the AI//
        //abstract this to backgroud processes

        return res.status(200).json({
            success: true,
            // data: catByIdResponse,
            // savedVideo: result,
        });
    } catch (err: any) {
        console.log('Error', err.message);
    }
};

const editJson = async (req: any, _res: any) => {
    const videoService = new VideoService();
    const video = await videoService.getVideoById(req.body.videoId);
    writeFile(video.json, JSON.stringify({ segun: 'oladmuritala' }, null, 2), (error: any) => {
        if (error) {
            console.log('An error has occurred while writing to our fa', error);
            return;
        }
        console.log('Data written successfully to disk');
    });
};
const paginateResponse = (data: any, page: any, limit: any, total: any) => {
    // const [result, total] = data;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
        // message: 'Success',
        // success: true,
        data,
        count: total,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
    };
};
export default {
    videoByID,
    editJson,
    list,
    listVideoPegs,
    uploadVideo,
    remove,
    uploadMp4Video,
    deleteVideo,
    updateVideo,
    listPromotionalVideos,
    listPromotionalVideosPag,
    listPromotionalVideosForAuthorizedUser,
};
