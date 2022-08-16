import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { KeyStore } from '../../infra/database/typeorm/entity/Key_Store';
import { Conflict, NotFound } from '../../server-shared/src/utils/exception';
import { KeyStoreRepository } from './keySore.repository';

export interface KeyStoreService {
    getAll(): Promise<KeyStore[]>;
    getById(id: string): Promise<KeyStore>;
}

@injectable()
export class KeyStoreServiceImp implements KeyStoreService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.KEYSTORE_REPOSITORY) private keyStoreRepository: KeyStoreRepository,
    ) {}

    public async getAll(): Promise<KeyStore[]> {
        return await this.keyStoreRepository.findAll();
    }

    public async getById(id: string): Promise<KeyStore> {
        const keyStore = await this.keyStoreRepository.findById(id);
        if (keyStore !== undefined) return keyStore;
        throw new NotFound('cant find key store');
    }

    public async findByCriteria(data:any): Promise<any> {
        const result = await this.keyStoreRepository.findByCriteria(data);
        if (!!result) return result;
        throw new Conflict('can not find the key store');
    }

    public async save(data:any): Promise<any> {
        const created = await this.keyStoreRepository.save(data);
        if (!!created) return created;
        throw new Conflict('can not create the key store');
    }

    public async remove(keyStoreId:string):Promise<any>{
        const result = await this.keyStoreRepository.delete(keyStoreId);
        if (!!result) return result;
        throw new Conflict('can not remove the key store');
    }
}