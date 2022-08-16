import { Router } from 'express'
const AWS = require('aws-sdk')
const VideoDownloadRouter = Router()
import * as dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.REGION
const accessKeyId = process.env.AWS_ID
const secretAccessKey = process.env.AWS_SECRET
const s3 = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
})
/**
 * Download Video
 *
 * @Method GET
 * @URL /api/download/video
 *
 */

VideoDownloadRouter.route('/video').get(
      async (req: any, _res: any, _next: any) => {
            try {
                  const Key = req.query.key
                  console.log(req.query.key)

                  var bucketParams = {
                        Bucket: bucketName,
                        Key,
                  }
                  s3.getObject(bucketParams, function put(err: any, data: any) {
                        if (err) console.log(err, err.stack)
                        else console.log(data)

                        console.log(data.Body)
                  })
            } catch (error: any) {
                  console.log(error.message)
            }
      }
)

export default VideoDownloadRouter
