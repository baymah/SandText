import { Router } from 'express'
import { getManager } from 'typeorm'
import { ProductVideo } from '../../infra/database/typeorm/entity/Product_Video'
const VideoUploadRouter = Router()
import * as dotenv from 'dotenv'
import { dbConnection } from '../../infra/database/typeorm/db.connection'
dotenv.config()

// import {productVideoRepo } from "../../repository";
/**
 * Upload Video
 *
 * @Method POST
 * @URL /api/video/upload
 *
 */
VideoUploadRouter.route('/').get(async (_req: any, res: any) => {
      try {
            // const category = await categoryRepo.getAllCategory();
            // // const category = await categoryRepo.getCategoryById(categoryId);
            // if (!category) return res.status(404).send("Category not found");

            // const result = await productVideoRepo.getAllProductVideo();
            // if (!result)
            //       return res.status(400).json({
            //             success: false,
            //             message: "No product found",
            //       });
            const videoRepository = getManager().getRepository(ProductVideo)
            const result = await videoRepository.find({})
            const ovl = await Promise.all(
                  result.map(async (productVideo) => {
                        const peggs = await dbConnection
                              .getConnection()
                              .query(
                                    'select * from processed_videos_and_json_urls where VIDEO_URL=?',
                                    [productVideo.video]
                              )
                        return {
                              id: productVideo.id,
                              // product_id: productVideo.product_id,
                              // category_id: productVideo.category_id,
                              video: productVideo.video,
                              json: peggs.length > 0 ? peggs[0].JSON_URL : null,
                        }
                  })
            )
            res.status(200).json({
                  status: true,
                  message: 'Video product fetch successfully',
                  data: ovl,
            })
      } catch (error: any) {
            console.log(error.message)
      }
})

export default VideoUploadRouter
