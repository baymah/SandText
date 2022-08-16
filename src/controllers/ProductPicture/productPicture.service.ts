import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { ProductPicture } from '../../infra/database/typeorm/entity/Product_Picture';
import { Conflict } from '../../server-shared/src/utils/exception';
import { ProductPictureRepository } from './productPicture.repository';

export interface ProductPictureService {
    getAll(): Promise<ProductPicture[]>;
    // getById(id: string): Promise<ProductPicture|undefined>;
    save(data:any): Promise<any>;
}

@injectable()
export class ProductPictureServiceImp implements ProductPictureService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.PRODUCTPICTURE_REPOSITORY) private productPictureRepository: ProductPictureRepository,
    ) {}

    public async getAll(productId?:string,take?:number,page?:number): Promise<any> {
        // const stateCache= await asyncRedisClient.getOne(`take[${take}]:page[${page}]:[products]`);
        // if (stateCache) {
        //     return JSON.parse(stateCache)
        // }
        // const selectField=['id','picture','thumbnail']
        const selectField=['picture']
        // const productId='fbeb2d61-a37b-4b0b-8c0d-e2d8468645e5';
        console.log(productId,"ProductId:::")
        const paginatedProduct = await this.productPictureRepository.findAllEntityWhere(take,page,selectField,productId);
        // await asyncRedisClient.setex(`take[${take}]:page[${page}]:[products]`, JSON.stringify(paginatedProduct));

        return paginatedProduct
    }

    // public async getById(id: string): Promise<DevProduct|undefined> {
    //     const product = await this.productRepository.findById(id);
    //     if (product !== undefined) return product;
    //     // throw new NotFound('cant find the product');
    //     return undefined
    // }

    public async save(data:any): Promise<any> {
        const productPicture = await this.productPictureRepository.save(data);
        if (!!productPicture) {
            console.log("productPictureUpadl",productPicture)
            return productPicture
        };
        throw new Conflict('Cant create new product picture');
    }
}