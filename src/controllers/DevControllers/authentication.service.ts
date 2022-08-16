import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { AccessTokenServiceImp } from '../AccessToken/accesstoken.service';
import { ProductKeyServiceImp } from '../ProductKey/productKey.service';
import { Dev_User } from '../../infra/database/typeorm/entity/Dev_User';
import { Conflict, NotFound } from '../../server-shared/src/utils/exception';
import { AuthenticationRepository } from './authentication.repository';
import { sendMail } from '../../services/MailService/mailgun.service';
import { getCustomizeDeveloperCredentialTemplate } from '../../authentication/src/authorization/utils/utils';
import { CreateDevUser } from '../../validation/Devuser/auth';

export interface AuthenticationService {
    getAll(): Promise<Dev_User[]>;
    getById(id: string): Promise<Dev_User>;
}

@injectable()
export class AuthenticationServiceImp implements AuthenticationService {

    constructor(
        @inject(SERVICE_IDENTIFIERS.AUTHENTICATION_REPOSITORY) private authRepository: AuthenticationRepository,
        @inject(SERVICE_IDENTIFIERS.PRODUCTKEY_SERVICE) private productKeyService: ProductKeyServiceImp,
        @inject(SERVICE_IDENTIFIERS.ACCESSTOKEN_SERVICE) private accessTokenService: AccessTokenServiceImp,

    ) {}

    public async getAll(): Promise<Dev_User[]> { //try catch b4 they roast us
        return await this.authRepository.findAll();
    }

    public async getById(id: string): Promise<Dev_User> {
        const devUser = await this.authRepository.findById(id);
        if (devUser !== undefined) return devUser;
        throw new NotFound('cant find the user');
    }

    public async getByPhone(phone: string): Promise<Dev_User> {
        const devUser = await this.authRepository.findByQuery({phone});
        if (devUser !== undefined) return devUser[0];
        throw new NotFound('cant find the user');
    }

    public async getByEmail(email: string): Promise<Dev_User> {
        // const devUser = await this.authRepository.findByQuery({email});
        const devUser = await this.authRepository.getUserByEmailRelation(email)
        console.log(devUser,"devUserInService")
        if (devUser !== undefined) return devUser[0];
        throw new NotFound('cant find the user');
    }

    public async getByName(company_name:string):Promise<Dev_User>{
        const devUser = await this.authRepository.findByQuery({company_name});
        if (devUser !== undefined) return devUser[0];
        throw new NotFound('cant find the user');
    }

    public async save(data:CreateDevUser): Promise<any> {
        const authUser = await this.authRepository.save(data);
        if (!!authUser) {
            const [publicKey,accessToken]=await Promise.all([this.productKeyService.save(authUser.id),
             this.accessTokenService.save(authUser.id)])
            sendMail(authUser.email, 'Developer credentials', getCustomizeDeveloperCredentialTemplate(publicKey.public_key,accessToken.access_token));
            return authUser
        };
        throw new Conflict('Cant create new user');
    }

    public async getDevUserDetails(): Promise<Dev_User[]> { //try catch b4 they roast us
        return await this.authRepository.getDevUserDetails();
    }
}