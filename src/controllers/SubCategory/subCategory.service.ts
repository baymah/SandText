import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { SubCategory } from '../../infra/database/typeorm/entity/SubCategory';
// import { NotFound } from '../../server-shared/src/utils/exception';
import { SubCategoryRepository } from './subCategory.repository';


export interface SubCategoryService {
    getAll(): Promise<SubCategory[]>;
    getById(id: string): Promise<SubCategory | undefined>;
}

@injectable()
export class SubCategoryServiceImp implements SubCategoryService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.SUBCATEGORY_REPOSITORY) private subCategoryRepository: SubCategoryRepository,
    ) { }

    public async getAll(): Promise<SubCategory[]> {
        return await this.subCategoryRepository.findAll();
    }

    public async getById(id: string): Promise<SubCategory | undefined> {
        const category = await this.subCategoryRepository.findById(id);
        if (category !== undefined) return category;
        return undefined
        // throw new NotFound('cant find the subcategory');
    }
}