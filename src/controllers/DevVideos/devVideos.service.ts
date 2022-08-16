import { injectable, inject } from 'inversify';
import { GenericResponseError } from '../../common/utils/error';
import { HTTPStatus } from '../../constant/http-status';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
// import { Conflict, NotFound } from '../../server-shared/src/utils/exception';
import { S3ServiceImp } from '../s3UploadService/s3.service';
import { DevVideosRepository } from './devVideos.repository';

export interface CreateVideoRequest {
    name: string
    description: string
    user_id: string
    mp4_link: string
}

export interface CreateVideoResponse {
    id: string
    name: string
    description: string
    user_id: string
    mp4_link: string
    updated_at: Date
    created_at: Date
}

export interface DevVideoService {
    uploadVideoFile(video_file: any): Promise<string>
    saveVideoDetails(videoDetails: CreateVideoRequest): Promise<CreateVideoResponse>;
    getVideoById(video_id: string): Promise<CreateVideoResponse>;
    getAllUsersVideos(user_id: string): Promise<CreateVideoResponse[]>;
    updateVideoDetails(video_id: string, videoDetails: CreateVideoRequest): Promise<CreateVideoResponse>;
    // saveProductsInVideo(products_id_array: string[]): Promise<string>
    // getAllProductsInVideo(products_id_array: string[]): Promise<string>
    deleteVideo(video_id: string): Promise<string>
}

@injectable()
export class DevVideosServiceImp implements DevVideoService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.VIDEOS_REPOSITORY) private devVideosRepository: DevVideosRepository,
        @inject(SERVICE_IDENTIFIERS.s3_SERVICE) private s3Service: S3ServiceImp,
    ) {}

    uploadVideoFile(video_file: Express.Multer.File): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("i dy here me guy")
                const video_response = await this.s3Service.uploadMultipartVideo(video_file)
                resolve(video_response)
            } catch (error) {
                console.log(error, "error")
                reject("Error occurred while uploading video file")
            }
        })
    }

    saveVideoDetails(video_details: CreateVideoRequest): Promise<CreateVideoResponse> {
       return new Promise(async (resolve, _reject) => {
        try {
            const video = await this.devVideosRepository.save(video_details)
            resolve(video)
        } catch (error) {
            console.log(error, "error")  
            return GenericResponseError.throwNewError({
                httpStatus: HTTPStatus.BAD_REQUEST,
                message: `Error occurred while saving video details.`
            });      
        }
       })
    }

    async getVideoById(video_id: string): Promise<CreateVideoResponse> {
        try {
            console.log("i dey the get video by id method")
            const video = await this.devVideosRepository.findOneByQuery({id: video_id, is_deleted: 0})
            if(!video){
                console.log("i enetered the i did not find it block!!!!!!!")
                return Promise.reject(`Video with id ${video_id} does not exist.`)   
            }

           return Promise.resolve(video)
        } catch (error) {
            console.log(error, "error")  
            return Promise.reject(GenericResponseError.throwNewError({
                httpStatus: HTTPStatus.BAD_REQUEST,
                message: `Error occurred while getting video details.`
            })); 
        }
    }

    async getAllUsersVideos(user_id: string): Promise<CreateVideoResponse[]> {
        try {
            const user_videos = await this.devVideosRepository.findByQuery({user_id, is_deleted: 0})
            return Promise.resolve(user_videos)
        } catch (error) {
            console.log(error, "error")  
            return Promise.reject(GenericResponseError.throwNewError({
                httpStatus: HTTPStatus.BAD_REQUEST,
                message: `Error occurred while getting user videos.`
            })); 
        }
    }

    async updateVideoDetails(video_id: string, videoDetails: CreateVideoRequest): Promise<CreateVideoResponse> {
        try {
             const video_result = await this.doesVideoExist(video_id)
             if(!video_result){
                console.log(video_result, "video_result")
                return Promise.reject(`Video with id ${video_id} does not exist.`)
             }
             const delete_status = await this.isVideoDeleted(video_id)
             if(!delete_status){
                return Promise.reject(`Video is deleted.`);  
             }

             const video = await this.devVideosRepository.updateVideos(video_id, videoDetails)
             console.log(video, "video")
             const updated_video = await this.getVideoById(video_id)
             console.log(updated_video, "video")
             return Promise.resolve(updated_video)
        } catch (error) {
             console.log(error, "error")  
             return Promise.reject(GenericResponseError.throwNewError({
                 httpStatus: HTTPStatus.BAD_REQUEST,
                 message: `Error occurred while updating video details.`
             })); 
        }
     }

     private async isVideoDeleted(video_id: string): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                const video = await this.devVideosRepository.findOneByQuery({id: video_id, is_deleted: 0})
                video ? resolve(true) : resolve(false)
            } catch (error) {
                console.log(error, "error")  
                reject(GenericResponseError.throwNewError({
                    httpStatus: HTTPStatus.BAD_REQUEST,
                    message: `Error occurred while updating video details.`
                })); 
            }
        })
     }

     private async doesVideoExist(video_id: string): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            try {
                const video = await this.devVideosRepository.findById(video_id)
                video ? resolve(true) : resolve(false)
            } catch (error) {
                console.log(error, "error")  
                reject(GenericResponseError.throwNewError({
                    httpStatus: HTTPStatus.BAD_REQUEST,
                    message: `Error occurred while getting video details.`
                })); 
            }
        })
     }

    // saveProductsInVideo(products_id_array: string[]): Promise<string> {
    //     try {
    //         throw new Error('Method not implemented.');
    //     } catch (error) {
            
    //     }
    // }

    // getAllProductsInVideo(products_id_array: string[]): Promise<string> {
    //     throw new Error('Method not implemented.');
    // }

    deleteVideo(video_id: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const video_result = await this.doesVideoExist(video_id)
                if(!video_result){
                   console.log(video_result, "video_result")
                   reject(`Video with id ${video_id} does not exist.`)
                }
                const delete_status = await this.isVideoDeleted(video_id)
                if(!delete_status){
                   reject(`Video is deleted.`);  
                }

                await this.devVideosRepository.update(video_id, {is_deleted: 1})
                resolve(" deleted succussfully")
            } catch (error) {
                console.log(error, "error")  
                reject(GenericResponseError.throwNewError({
                    httpStatus: HTTPStatus.BAD_REQUEST,
                    message: `Error occurred while updating video details.`
                })); 
            }
        })
    }

}