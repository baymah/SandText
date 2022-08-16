import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { SubCategory } from '../../infra/database/typeorm/entity/SubCategory';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class SubCategoryRepository extends GenericRepositoryImp<SubCategory> {

    constructor() {
        super(getRepository(SubCategory));
    }
}