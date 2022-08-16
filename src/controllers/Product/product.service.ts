import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { ProductRepository } from './product.repository';
import { DevProduct } from '../../infra/database/typeorm/entity/Dev_Product';
import { asyncRedisClient } from '../../infra/redis';
import { S3ServiceImp } from '../s3UploadService/s3.service';
import { AuthenticationServiceImp } from '../DevControllers/authentication.service';
import { ProductPictureServiceImp } from '../ProductPicture/productPicture.service';
import { ProductAttributeServiceImp } from './productattribute.service';
import { DevVideoProductsServiceImp } from '../DevVideos/devVideoProduct.service';

export interface ProductService {
    getAll(): Promise<DevProduct[]>;
    getById(id: string): Promise<DevProduct|undefined>;
}

@injectable()
export class ProductServiceImp implements ProductService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.PRODUCT_REPOSITORY) private productRepository: ProductRepository,
        @inject(SERVICE_IDENTIFIERS.s3_SERVICE) private s3Service: S3ServiceImp,
        @inject(SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE) private userService:AuthenticationServiceImp,
        @inject(SERVICE_IDENTIFIERS.PRODUCTPICTURE_SERVICE) private productPictureService:ProductPictureServiceImp,
        @inject(SERVICE_IDENTIFIERS.PRODUCTATTRIBUTE_SERVICE) private productAttributeService:ProductAttributeServiceImp,
        @inject(SERVICE_IDENTIFIERS.DEVVIDEOSPRODUCT_SERVICE) private devVideoProductService:DevVideoProductsServiceImp
    ) {}

    public async getAll(take?:number,page?:number): Promise<any> {
        const selectField=['id','name','description']
        const paginatedProduct = await this.productRepository.findAllEntity(take,page,selectField);
        const pa = await Promise.all(paginatedProduct.map(async(product:any)=>{
            const ppicture=await this.productPictureService.getAll(product.id)
            const pproperties = await this.productAttributeService.getAll(product.id)

            return {...product,product_picture:ppicture,product_attributes:pproperties}
        }))
        await asyncRedisClient.setex(`take[${take}]:page[${page}]:[products]`, JSON.stringify(paginatedProduct));
        return pa
    }

    public async getById(id: string): Promise<DevProduct|undefined> {
        const product = await this.productRepository.findById(id);
        if (product !== undefined) return product;
        return undefined
    }

    public async uploadProductFile(product_file:any,userRequest:any,productId:string):Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userRequest.user_id)
                const user =await this.userService.getById(userRequest.user_id);
                const company_name=user.company_name;
                const product_response = await this.s3Service.uploadMultipartProduct(company_name,product_file)
                const productPicture =await Promise.all(product_response.map((s3Upload:any)=>{
                     return this.productPictureService.save({product_id:productId,picture:s3Upload.Location,thumbnail:s3Upload.Location})
                }))
                //loop throuth the response and get the key and append the cdn link to it
                // resolve(product_response);
                console.log(productPicture,"PRODUCT PICTURE IN PRODUCT UPLOAD SERVICE::::")
                resolve(productPicture)
            } catch (error:any) {
                reject("Error occurred while uploading product file")
            }
        })
    }
    public async save(data:any,requestUser:any): Promise<any> {
        //we now need the user_id...   //note
        return new Promise(async(resolve, reject) => {
            try {
                const {name,brand,description,slug,category,subcategory,price,colors,currency,quantity} = data;
                const product = await this.productRepository.save({name,brand,description,slug,category_id:category,subcategory_id:subcategory,price,colors,currency,quantity,user_id:requestUser.user_id})
                const stack: any = [];
                colors.map((color: any) => {
                    // if (!color.weights?.length) {
                        color.properties.map((ppty:any)=>{
                            if(ppty.weight){
                                stack.push({
                                    product_id:product.id,
                                    color:color.name,
                                    size:ppty.size,
                                    quantity:ppty.quantity,
                                    weight:ppty.weight,
                                })
                            }
                            stack.push({
                                product_id:product.id,
                                color:color.name,
                                size:ppty.size,
                                quantity:ppty.quantity,
                                weight:"",
                            })
                        })
                });
                stack.map(async (_productAttributeQueue: any) => {
                    await this.productAttributeService.save(_productAttributeQueue)
                });
                await this.devVideoProductService.save({product_id:product.id,promotional_video_id:'somerandom id'});
                resolve(product)
        }
        catch(error:any){
            console.log(error,"Error message")
            // reject("Error occurred while saving the product")
            reject(error)
        }
    })
}
}