import chance from 'chance';
import { injectable, inject } from 'inversify';
// import generateRandomToken from '../../common/utils/utils';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { PubKey } from '../../infra/database/typeorm/entity/Pub_Key';
import { Conflict, NotFound } from '../../server-shared/src/utils/exception';
import { ProductKeyRepository } from './productKey.repository';

export interface ProductKeyService {
    getAll(): Promise<PubKey[]>;
    getById(id: string): Promise<PubKey>;
}

@injectable()
export class ProductKeyServiceImp implements ProductKeyService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.PRODUCTKEY_REPOSITORY) private productKeyRepository: ProductKeyRepository,
    ) {}

    public async getAll(): Promise<PubKey[]> {
        return await this.productKeyRepository.findAll();
    }

    public async getById(id: string): Promise<PubKey> {
        const publicKey = await this.productKeyRepository.findById(id);
        if (publicKey !== undefined) return publicKey;
        throw new NotFound('cant find public key');
    }

    public async save(userId:any): Promise<any> {
        const publicKeyGenerator = `EDK_PUB${new chance().integer({ max: 9999999999, min: 1000000000 })}`
        const privateKeygenerator=`EDK_PVT${new chance().integer({ max: 9999999999, min: 1000000000 })}`
        const publicKeyPayload = {user_id:userId,public_key:publicKeyGenerator,private_key:privateKeygenerator,status:"0"}
        const created = await this.productKeyRepository.save(publicKeyPayload);
        if (!!created) return created;
        throw new Conflict('Cant create new public key');
    }
}