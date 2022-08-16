import { S3 } from 'aws-sdk';
import { injectable } from 'inversify';
import { config } from '../../config/config';
// import SERVICE_IDENTIFIERS from '../../constant/identifier';
interface FileType {
    buffer: any;
    originalname: string;
}

@injectable()
export class S3ServiceImp {
    constructor() {}

    async uploadMultipartVideo(video_file: any): Promise<any>{
        try {
            console.log("i dey the s3 service")
            // return {
            //     Body: fs.createReadStream(file.buffer),
            //     Bucket: config.aws.AWS_BUCKET_NAME,
            //     Key: `images/${uuid()}-${file.originalname.split(' ').join('')}`,
            //     // ACL: 'public-read',
            // };
            const s3 = new S3()
            const params = {
                Bucket: config.aws.AWS_BUCKET_NAME,
                Key: `videos/mp4's/${video_file.originalname}`,
                Body: video_file.buffer,
            };

            const options = {
                partSize: 10 * 1024 * 1024,
                queueSize: 10,
              };

              const video_upload = await s3.upload(params, options).promise()
              console.log(video_upload, "video_upload")
                // .then((result) => {
                //     console.log(result)
                //     Promise.resolve(result)
                // })
                // .catch(console.error);
               return video_upload
        } catch (error:any) {
            console.log(error, "error")
            return ("Error while uploading video to s3 bucket.")
        }
    }

    //Upload Product
    async uploadMultipartProduct(company_name:any,product_file:any):Promise<any>{
        return new Promise(async (resolve, reject) => {
            try{
                const s3= new S3()
                const params = product_file.map((file: FileType) => {
                    const filename = file.originalname.split(' ').join('').split('.')[0];
                    return {
                        Body: file.buffer,
                        Bucket: config.aws.AWS_BUCKET_NAME,
                        Key: `DevProducts/${company_name.split(' ').join('')}/${filename}`,
                    };
                });
                const options = {
                        partSize: 10 * 1024 * 1024,
                        queueSize: 10,
                      };
                return resolve(await Promise.all(params.map((param: any) => s3.upload(param,options).promise())));
            }
            catch(error:any){
                // return reject("Error occurred while uploading product file")
                return reject(error.message)

            }
        })
    }
    async uploadImageFile(companyName:string,file:any){
        try{
            const s3= new S3();
            const filename = file.originalname.split(' ').join('').split('.')[0];
            const params = {
                    Body: file.buffer,
                    Bucket: config.aws.AWS_BUCKET_NAME,
                    Key: `ShopLogo/${companyName.split(' ').join('')}/${filename}`,
                };
            const options = {
                    partSize: 10 * 1024 * 1024,
                    queueSize: 10,
                  };
            return (await s3.upload(params,options).promise());
        }
        catch(error:any){
            // return reject("Error occurred while uploading product file")
            return (error.message)

        }
    }

}