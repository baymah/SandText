import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { AccessToken } from '../../infra/database/typeorm/entity/Access_Token';
import { Conflict, NotFound } from '../../server-shared/src/utils/exception';
import { hashPassword } from '../../utils/auth';
import { AccessTokenRepository } from './accesstoken.repository';

export interface AccessTokenService {
    getAll(): Promise<AccessToken[]>;
    getById(id: string): Promise<AccessToken>;
}

@injectable()
export class AccessTokenServiceImp implements AccessTokenService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.ACCESSTOKEN_REPOSITORY) private accessTokenRepository: AccessTokenRepository,
    ) {}

    public async getAll(): Promise<AccessToken[]> {
        return await this.accessTokenRepository.findAll();
    }

    public async getById(id: string): Promise<AccessToken> {
        const accessToken = await this.accessTokenRepository.findById(id);
        if (accessToken !== undefined) return accessToken;
        throw new NotFound('Cant find the accessToken');
    }

    public async save(userId:string): Promise<any> {
        const generatedAccessToken =await hashPassword(this.token());
        console.log(generatedAccessToken,"GENERATED ACCESS TOKEN")
        const accessTokenPayload = {user_id:userId,token:generatedAccessToken,status:0}

        const created = await this.accessTokenRepository.save(accessTokenPayload);
        if (!!created) return created;
        throw new Conflict('Cant create new access token');
    }

    private  rand() {
        return Math.random().toString(10).substring(2); // remove `0.`
    };
    
    private token() {
        return this.rand() + this.rand(); // to make it longer
    };
}