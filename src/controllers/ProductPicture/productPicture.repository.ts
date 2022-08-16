import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { DevProductPicture } from '../../infra/database/typeorm/entity/Dev_Product_Picture';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';
import { FindQueryParams } from '../../server-shared/src/database/utils';
// import { paginateResponse } from '../../utils/helper';

@injectable()
export class ProductPictureRepository extends GenericRepositoryImp<DevProductPicture> {

    constructor() {
        super(getRepository(DevProductPicture));
    }

    public async findAllEntityWhere(take?:number,page?:number,selectQuery?:any,productId?:string): Promise<any> {
        take = Number(take) || 40
        page = Number(page) || 1;
        const skip = (page - 1) * take;
        const  query:FindQueryParams ={take,skip}

        // const stateRepository = await this.database.getRepository(StateRepository);
        const [data, _count] = await this.repository.findAndCount({where:{product_id:productId},select:selectQuery,...query });
        // const paginatedResult=paginateResponse(data,page,take,count);
        // return paginatedResult
        // await asyncRedisClient.setex(`take[${take}]:page[${page}]:[states]`, JSON.stringify(paginatedResponse));
        return data
    }
}