import { injectable } from 'inversify';
import {getRepository } from 'typeorm';
import { PromotionalVideoProducts } from '../../infra/database/typeorm/entity/Dev_PromotionalVideoProduct';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class DevVideoProductsRepository extends GenericRepositoryImp<PromotionalVideoProducts> {

    constructor() {
        super(getRepository(PromotionalVideoProducts));
    }
}