import { Request, Response } from 'express';
import { UserMap } from '../mappers/userMap';
import { UserService } from '../services/users.service';
import { categoryRepo, productVideoRepo, userRepo } from '../repository';
import { s3ProfilePixUpload } from '../services/s3Service';
// import { getPegsByVideoId } from '../services/pegg.service';
import UserActivitiesServices from '../services/UserActivitiesService';
import { joiValidate } from '../utils/validator';
import { UpdateUserDTO, UserrequestDTOSchema } from '../Dtos/UserDTO';
import { PromotionalVideoRepository } from '../repository/implementations/promotional_videos';
import { ShopRepo } from '../shop/src/repository';
// import { likeVideo } from './likes.controller';

const list = async (_req: Request, res: Response) => {
    try {
        const userService = new UserService();
        let users = await userService.getAll();
        const userMap = users.map((user) => UserMap.toAllUserDTO(user));
        return res.status(200).json({
            message: 'Users fetch successfully',
            success: true,
            data: userMap,
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

const remove = async (req: any, res: any) => {
    try {
        const userService = new UserService();
        let user = req.profile;
        let deletedUser = await userService.deleteById(user.id);
        res.status(200).json({
            message: 'User remove successfully',
            success: true,
            data: deletedUser,
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};
/**
 * Load user and append to req.
 */
const userByID = async (req: any, res: any, next: any, id: string) => {
    try {
        console.log('userById handler');

        const userService = new UserService();
        const promotionalVideoRepo = new PromotionalVideoRepository();
        let user = await userService.getById(id);
        console.log(user, 'To check his promo video');
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        let shop_meta;
        const shopResult = await new ShopRepo().checkUserShop(user.id);
        if (shopResult) {
            shop_meta = {
                ...shopResult,
            };
        } else {
            shop_meta = {
                id: '',
                shopName: '',
                categoryId: '',
            };
        }
        const result = {
            id: user.id,
            // userImage: user.picture ? user.picture : '',
            userName: user.username,
            noOfFollowing: 0,
            noOfFollowers: 0,
            description: user.bio ? user.bio : '',
            videoUploaded: user.promotionalVideos
                ? await Promise.all(
                      user.promotionalVideos.map(async (vd: any) => {
                          const video = await promotionalVideoRepo.findPromotionalVideoById2(vd.id); //get promoVideoProducts:::
                          return {
                              //   ...video,
                              id: video ? video.id : '',
                              thumbnail: video?.thumbnail ? video.thumbnail : '',
                              likeVideo: true,
                              likesCount: 3,
                              productcount: 2,
                              videoTitle: video?.title ? video.title : '',
                              video_aspect_ratio: video?.video_aspect_ratio,
                              videoDescripton: video?.description,
                              video: JSON.parse(video ? video.video : ''),
                              productCount: video?.products.length,
                              userImage: user?.picture,
                          };
                      }),
                  )
                : [],
            shop_meta,

            // videoUploaded: user.productVideo
            //     ? await Promise.all(
            //           user.productVideo.map(async (video: any) => {
            //               // getProductCountFromPegtable
            //               const product = await getPegsByVideoId(video.id);

            //               // video.product_video_comment="Eben"
            //               // const productComment = await commentService.getByVideoId(video.id);
            //               // console.log(video, 'EbEN shout');
            //               // video.map()

            //               // return JSON.parse(video.video)
            //               return {
            //                   ...video,
            //                   // product_video_comment: '',
            //                   // product_video_comment:[...productComment],
            //                   // ...video,
            //                   videoTitle: video.title,
            //                   video_aspect_ratio: video.video_aspect_ratio,
            //                   videoDescripton: video.description,
            //                   video: JSON.parse(video.video),
            //                   productCount: product.length,
            //                   userImage: user?.picture,
            //               };
            //           }),
            //       )
            //     : [],
            // videoCategory: categories,
            // likedProduct: raw.likes,
            // likedVideo: raw.product_video_likes,
        };
        // req.profile = UserMap.toDTO(user);
        // req.profile = UserMap.toDTO(user);
        req.profile = result;
        next()
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message ? err.message : err,
        });
    }
};

const updateUser = async (req: any, res: any) => {
    try {
        const { error, value: vRequest } = joiValidate<UpdateUserDTO>(UserrequestDTOSchema, req.body);
        if (error)
            return res.send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });
        const { username, email, country, dob, gender, phone } = vRequest;

        const userByUsername = await userRepo.getUserByUsername(username);
        if (userByUsername) return res.status(200).json({ success: false, message: 'Username taken' });
        const user = await userRepo.getUserByEmail(email);
        if (!user)
            res.status(200).json({
                success: false,
                message: 'User not found',
            });
        user.username = username;
        user.country = country;
        user.dob = dob;
        user.gender = gender;
        user.phone = phone;

        // await userRepo.save(user);
        const userService = new UserService()
        await userService.updateUserProfile(user)
        return res.status(200).json({
            success: true,
            message: 'User data updated',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

const updateUserProfile = async (req: any, res: any) => {
    try {
        const requestUser = req.requestUser;
        const { file } = req;
        const userService = new UserService();
        //send the file to the bucket and save the image to the server
        // const user = await authService.promoteUser(Number(userId), role)
        const user = await userService.getById(requestUser.id);
        if (!user) return res.json({ success: false, message: 'User not found' });
        const uploadResult = await s3ProfilePixUpload(file);
        user.picture = uploadResult.Location;
        let result = await userService.updateUserProfile(user);
        if (!result) return res.status(200).json({ success: false, message: 'Could not update user profile...' });
        const userActivitiesService = new UserActivitiesServices();
        const userActivities = await userActivitiesService.create({
            user_id: user.id,
            platform: req.headers.portal,
            activity: 'Update Profile',
            type: 'Update Profile',
            city: 'Lagos',
            region: 'Ikoyi',
            country: 'Nigeria',
            latitude: '6.45305560',
            longitude: '3.43555560',
            status: 1,
        });
        console.log(userActivities, 'USER ACTIVITIES');
        return res.status(200).json({
            success: true,
            message: 'Update request success',
            data: result,
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message });
    }
};
const userByIdAndInterestRelation = async (req: any, res: any, next: any, id: string) => {
    try {
        const user = await userRepo.getUserByIdWithInterestRelation(id);
        if (!user)
            return res.status(200).json({
                success: false,
                message: 'User not found',
            });
        req.profile = user;
        next();
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};
const userById = async (req: any, res: any, next: any, id: string) => {
    try {
        const user = await userRepo.getUserById(id);
        if (!user)
            return res.status(200).json({
                success: false,
                message: 'User not found',
            });
        req.profile = user;
        next();
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};
const userVideoByInterest = async (req: any, res: any) => {
    try {
        const user = req.requestUser;
        const interestNames = user.interests.map((interest: any) => interest.name);
        let productVideo: any = [];
        await Promise.all(
            interestNames.map(async (interestId: any, _index: any) => {
                const category = await categoryRepo.getByName(interestId);
                if (!category)
                    return res.status(200).json({
                        success: false,
                        message: 'Category not found',
                    });
                let pvideo = await productVideoRepo.getProductVideoCategory(category.id);
                productVideo.push(pvideo);
            }),
        );
        return res.status(200).json({
            success: true,
            message: 'Category fetch successfully',
            data: productVideo,
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

const read = (req: any, res: any) => {
    req.profile.password = undefined;
    return res.status(201).json({
        success: true,
        message: 'User fetch successfully',
        data: req.profile,
    });
};
const userInterest = async (req: any, res: any) => {
    try {
        const user = req.profile;
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        return res.status(200).json({
            success: true,
            data: user,
            message: 'User and its interests fetch successfully',
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
};

const verifyUserName = async (req: Request, res: Response) => {
    try {
        const userExist = await userRepo.getUserByUsername(req.body.username);
        if (!userExist) return res.status(200).json({ success: true, message: 'Username not taken' });
        return res.status(200).json({ success: false, message: 'Username taken.' });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message, error: err });
    }
};

export {
    list,
    read,
    remove,
    userByID,
    userById,
    updateUser,
    userInterest,
    verifyUserName,
    updateUserProfile,
    userVideoByInterest,
    userByIdAndInterestRelation,
};
