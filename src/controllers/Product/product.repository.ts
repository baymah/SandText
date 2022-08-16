import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { DevProduct } from '../../infra/database/typeorm/entity/Dev_Product';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';
// import { FindQueryParams } from '../../server-shared/src/database/utils';
// import { paginateResponse } from '../../utils/helper';

@injectable()
export class ProductRepository extends GenericRepositoryImp<DevProduct> {

    constructor() {
        super(getRepository(DevProduct));
    }

    public async findAllEntity(take?:number,page?:number,selectQuery?:any): Promise<any> {
        take = Number(take) || 40
        page = Number(page) || 1;
        // const skip = (page - 1) * take;
        // const  query:FindQueryParams ={take,skip}

        // const stateRepository = await this.database.getRepository(StateRepository);

        // const stateCache= await asyncRedisClient.getOne(`take[${take}]:page[${page}]:[states]`);
        // if (stateCache) {
        //     return res.json(JSON.parse(stateCache))
        // }
        // const [data, count] = await this.repository.findAndCount({select:selectQuery,...query });
        const data = await this.repository.find({select:selectQuery});
        // console.log(data,'Before passing for pagination')
        // const paginatedResult=paginateResponse(data,page,take,count);
        // return paginatedResult

        return data
        // await asyncRedisClient.setex(`take[${take}]:page[${page}]:[states]`, JSON.stringify(paginatedResponse));
    }
}