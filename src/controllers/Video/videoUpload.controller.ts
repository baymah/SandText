import { Router } from 'express'
const multer = require('multer')
const AWS = require('aws-sdk')
const VideoUploadRouter = Router()
import { config } from '../../config'

import { v4 as uuid } from 'uuid'
import { categoryRepo, productVideoRepo } from '../../repository'

const s3 = new AWS.S3({
      accessKeyId: config.aws.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
      region: config.aws.AWS_REGION,
})
/**
 * Upload Video
 *
 * @Method POST
 * @URL /api/video/upload
 *
 */

const storage = multer.memoryStorage({
      destination: function (_req: any, _file: any, callback: any): any {
            callback(null, '')
      },
})

const upload = multer({ storage }).single('videoFile')
VideoUploadRouter.route('/video').post(upload, async (req: any, res: any) => {
      const { categoryId } = req.body
      const myVideo = req.file.originalname.split('.')
      const fileType = myVideo[myVideo.length - 1]
      // const params = {
      //       acl: "private",
      //       Body: req.file.buffer,
      //       Bucket: "bucketeer-2d3a99a7-20b6-4150-8399-4a871f0932fb",
      //       Key: `public/${uuid()}.${fileType}`,
      // };

      try {
            const category = await categoryRepo.getCategoryById(categoryId)
            if (!category) return res.status(404).send('Category not found')
            const uploadParams = {
                  Body: req.file.buffer,
                  Bucket: 'bucketeer-2d3a99a7-20b6-4150-8399-4a871f0932fb',
                  Key: `public/video/${uuid()}.${fileType}`,
                  ACL: 'public-read',
            }
            const data = await s3.upload(uploadParams).promise()
            console.log({
                  message: `AWS_S3_SUCCESS: ${data.location}`,
                  data,
                  process: 'upload',
            })
            const video = {
                  video: data.Location,
                  thumbnail: 'url',
                  category,
                  product_id: uuid(),
            }
            let savedVideo = await productVideoRepo.save(video)
            res.status(201).send({
                  message: 'Video upload successfully',
                  data: savedVideo,
            })
      } catch (error: any) {
            console.log('AWS_S3_ERROR', { error, process: 'upload' })
            return res.json({ error, process: 'upload' })
      }
})

export default VideoUploadRouter
