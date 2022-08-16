import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import Logger from '../../cores/Logger';
import { Dev_Shop } from '../../infra/database/typeorm/entity/Dev_Shop';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class ShopRepository extends GenericRepositoryImp<Dev_Shop> {
    constructor() {
        super(getRepository(Dev_Shop));
    }
    async Shops(){
        try{
            return await this.repository.find({relations:['category']})
        }catch(err:any){
            Logger.info(`Error: ${err.message}: Date: ${new Date().toISOString}`)
            return Promise.reject(new Error("Internal Server Error"))
        }
   }
}