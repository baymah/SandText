import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  request,
  response,
  httpPost,
  httpGet,
  queryParam,
} from 'inversify-express-utils';
import multer from 'multer';
import { FriendlyErrorUtil, GenericResponseError } from '../../common/utils/error';
import { HTTPStatus } from '../../constant/http-status';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { validate } from '../../middleware/validation';
import { createDevVideo } from '../../validation/DevVideo/devVideo.schema';
import { DevVideosServiceImp } from './devVideos.service';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

@controller('/v1/auth/videos')
export class VideosController{
  @inject(SERVICE_IDENTIFIERS.VIDEOS_SERVICE) private devVideosService!: DevVideosServiceImp;
  @inject(SERVICE_IDENTIFIERS.FRIENDLY_ERROR) private friendlyErrorUtil!: FriendlyErrorUtil;


    @httpPost('/upload_video', upload.single('video'))//clearer naming of routes
      async allUserDetails(
        @request() req: Request,
        @response() res: Response
      ) {
        try {
            console.log(req.file, "req.file")
            if(!req.file){
               return GenericResponseError.throwNewError({
                    httpStatus: HTTPStatus.BAD_REQUEST,
                    message: `A video file must be uploaded.`
                });
            }
            const video_file = req.file as Express.Multer.File

            return await this.devVideosService.uploadVideoFile(video_file).then((result) => {
                return res.status(200).json({ success: true, data: result });
            }).catch((error) => {
                return res.status(400).send({
                    status: false,
                    message: error.message
                });
            })
        } catch (error: any) {
            return res.status(400).send({
                status: false,
                message: error.message
            });
        }

      }

      
      @httpPost('/save_details', validate({ schema: createDevVideo }))//clearer naming of routes
      async saveVideoDetails(
        @request() req: Request,
        @response() res: Response
      ) {
        try {
            const video_details = req.body
            console.log(req.body, "req.body", video_details, "video_details")
            return await this.devVideosService.saveVideoDetails(video_details).then((result) => {
                return res.status(201).json({ success: true, data: result });
            })
            .catch((error) => {
                return res.status(400).send({
                    status: false,
                    message: error.message
                });
            })
        } catch (error: any) {
            return res.status(400).send({
                status: false,
                message: error.message
            });
        }
      }

      @httpGet('/get_details/:video_id')
      async getVideoDetails(
        @queryParam('def_video_id') _def: string,
        @request() req: Request,
        @response() res: Response
      ) {
            try {
                const {video_id} = req.params
                await this.friendlyErrorUtil.validateRequiredUUID({video_id})
                return await this.devVideosService.getVideoById(video_id).then((result) => {
                    return res.status(200).json({ success: true, data: result });
                })
                .catch((error) => {
                    return res.status(400).send({
                        status: false,
                        message: error
                    });
                })
            } catch (error: any) {
                return res.status(400).send({
                    status: false,
                    message: error.message
                });
            }

        }

        @httpGet('/get_all/:user_id')
        async getAllUserVideos(
          @queryParam('def_video_id') _def: string,
          @request() req: Request,
          @response() res: Response
        ) {
              try {
                  const {user_id} = req.params
                  await this.friendlyErrorUtil.validateRequiredUUID({user_id})
                  return await this.devVideosService.getAllUsersVideos(user_id).then((result) => {
                      return res.status(200).json({ success: true, data: result });
                  })
                  .catch((error) => {
                      return res.status(400).send({
                          status: false,
                          message: error.message
                      });
                  })
              } catch (error: any) {
                  return res.status(400).send({
                      status: false,
                      message: error.message
                  });
              }
          }

          @httpPost('/update/:video_id', validate({ schema: createDevVideo }))
          async updateVideoDetails(
            @queryParam('def_video_id') _def: string,
            @request() req: Request,
            @response() res: Response
          ) {
                try {
                    const {video_id} = req.params
                    const video_details = req.body
                    await this.friendlyErrorUtil.validateRequiredUUID({video_id})

                    return await this.devVideosService.updateVideoDetails(video_id, video_details).then((result) => {
                        return res.status(200).json({ success: true, data: result });
                    })
                    .catch((error) => {
                        return res.status(400).send({
                            status: false,
                            message: error
                        });
                    })
                } catch (error: any) {
                    return res.status(400).send({
                        status: false,
                        message: error.message
                    });
                }
            }

            @httpPost('/delete/:video_id')
            async deleteVideo(
              @queryParam('def_video_id') _def: string,
              @request() req: Request,
              @response() res: Response
            ) {
                  try {
                      const {video_id} = req.params
                      await this.friendlyErrorUtil.validateRequiredUUID({video_id})
                      return await this.devVideosService.deleteVideo(video_id).then((result) => {
                          return res.status(200).json({ success: true, data: result });
                      })
                      .catch((error) => {
                          return res.status(400).send({
                              status: false,
                              message: error
                          });
                      })
                  } catch (error: any) {
                      return res.status(400).send({
                          status: false,
                          message: error.message
                      });
                  }
              }

}