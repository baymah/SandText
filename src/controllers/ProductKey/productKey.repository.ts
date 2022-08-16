import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { ProductKey } from '../../infra/database/typeorm/entity/Product_Key';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class ProductKeyRepository extends GenericRepositoryImp<ProductKey> {

    constructor() {
        super(getRepository(ProductKey));
    }
}