import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { Conflict } from '../../server-shared/src/utils/exception';
import { DevVideoProductsRepository } from './devVideoProductRepository';


export interface DevVideoProductService {
    save(data:any): Promise<any>
}

@injectable()
export class DevVideoProductsServiceImp implements DevVideoProductService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.DEVVIDEOSPRODUCT_REPOSITORY) private devVideoProductRepository: DevVideoProductsRepository,
    ) {}

    public async save(data:any): Promise<any> {
        const promoProduct = await this.devVideoProductRepository.save(data);
        if (!!promoProduct) {
            console.log("DevProductAttribute",promoProduct)
            return promoProduct
        };
        throw new Conflict('Cant create new promoProduct');
    }
}