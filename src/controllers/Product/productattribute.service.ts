import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { DevProductAttributes } from '../../infra/database/typeorm/entity/Dev_ProductAttribute';
import { Conflict } from '../../server-shared/src/utils/exception';
// import { NotFound } from '../../server-shared/src/utils/exception';
import {DevProductAttributesRepository  } from './productattribute.repository';


export interface ProductAttributeService {
    getAll(): Promise<DevProductAttributes[]>;
    getById(id: string): Promise<DevProductAttributes | undefined>;
}

@injectable()
export class ProductAttributeServiceImp implements ProductAttributeService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.PRODUCTATTRIBUTE_REPOSITORY) private devProductAttributesRepository: DevProductAttributesRepository,
    ) { }

    // public async getAll(): Promise<DevProductAttributes[]> {
    //     return await this.devProductAttributesRepository.findAll();
    // }

    public async getAll(productId?:string,take?:number,page?:number): Promise<any> {
        // const stateCache= await asyncRedisClient.getOne(`take[${take}]:page[${page}]:[products]`);
        // if (stateCache) {
        //     return JSON.parse(stateCache)
        // }
        // const selectField=['id','picture','thumbnail']
        const selectField=['color','size','weight','quantity']
        // const productId='fbeb2d61-a37b-4b0b-8c0d-e2d8468645e5';
        console.log(productId,"ProductId:::")
        const paginatedProduct = await this.devProductAttributesRepository.findAllEntityWhere(take,page,selectField,productId);
        // await asyncRedisClient.setex(`take[${take}]:page[${page}]:[products]`, JSON.stringify(paginatedProduct));

        return paginatedProduct
    }

    public async getById(id: string): Promise<DevProductAttributes | undefined> {
        const productAtt = await this.devProductAttributesRepository.findById(id);
        if (productAtt !== undefined) return productAtt;
        return undefined
        // throw new NotFound('cant find the subcategory');
    }

    public async save(data:any): Promise<any> {
        const productAttribute = await this.devProductAttributesRepository.save(data);
        if (!!productAttribute) {
            console.log("productAttribute",productAttribute)
            return productAttribute
        };
        throw new Conflict('Cant create new product picture');
    }
}