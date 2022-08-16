import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { Category } from '../../infra/database/typeorm/entity/Category';
// import { NotFound } from '../../server-shared/src/utils/exception';
import { CategoryRepository } from './category.repository';


export interface CategoryService {
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category|undefined>;
}

@injectable()
export class CategoryServiceImp implements CategoryService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
    ) {}

    public async getAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }

    public async getById(id: string): Promise<Category|undefined> {
        const category = await this.categoryRepository.findById(id);
        if (category !== undefined) return category;
        return undefined
        // throw new NotFound('cant find the category');
    }
}