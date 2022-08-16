import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { Category } from '../../infra/database/typeorm/entity/Category';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class CategoryRepository extends GenericRepositoryImp<Category> {

    constructor() {
        super(getRepository(Category));
    }
}