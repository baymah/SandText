import { injectable,inject } from 'inversify';
// import { APIError } from '../../common/errors/app-error';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { Dev_Shop } from '../../infra/database/typeorm/entity/Dev_Shop';
// import { S3ServiceImp } from '../s3UploadService/s3.service';
import { ShopRepository } from './shop.repository';

export interface ShopService {
    getAll(): Promise<Dev_Shop[]>;
}

@injectable()
export class ShopServiceImp implements ShopService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.SHOP_REPOSITORY) private shopRepository: ShopRepository,
        // @inject(SERVICE_IDENTIFIERS.s3_SERVICE) private s3Service: S3ServiceImp,
    ) {}

    public async getAll(): Promise<Dev_Shop[]|any> {
        try{
            const shopResult = await this.shopRepository.Shops();
            return shopResult
        }catch(err){
            return Promise.reject(err)
        }
    }

    public async create(_file:any,userRequest:any,data:any){
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userRequest.user_id)
                // const user =await this.shopService.getById(userRequest.user_id);
                // const company_name=user.company_name;
                // const product_response = await this.s3Service.uploadMultipartProduct(company_name,product_file)
                // const uploadLogoResponse = await this.s3Service.uploadImageFile(product_file);
                // const productPicture =await Promise.all(product_response.map((s3Upload:any)=>{
                    //  return this.shopService.save({product_id:productId,picture:s3Upload.Location,thumbnail:s3Upload.Location})
                // }))
                console.log(data,"requestBody data")
                
                const payload= {company_name!:data.company_name,
                slug!: data.slug,
                user_id!:userRequest.user_id,
                phone!:data.phone,
                email!: data.email,
                address!: data.address,
                city_id!: data.city,
                state_id!: data.state,
                delivery_status!: data.delivery_status,
                logistics!: data.logistics,
                category_id!: data.category,
                logo!: "",
                logistic_id!: data.logistics
                }

                const result =await this.shopRepository.save(payload)
                resolve(result);
            } catch (error:any) {
                // reject("Error occurred while creating shop")
                reject(error)
            }
        })
    }
}