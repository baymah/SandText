import { injectable } from 'inversify';
import { pick } from 'lodash';
import { getRepository } from 'typeorm';
import { AccessToken } from '../../infra/database/typeorm/entity/Access_Token';
import { KeyStore } from '../../infra/database/typeorm/entity/Key_Store';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class KeyStoreRepository extends GenericRepositoryImp<KeyStore> {

    constructor() {
        super(getRepository(KeyStore));
    }

    async findByCriteria(data:any):Promise<any>{
        try {
            const user = await this.repository.find({where:{user_id:data.user_id,primary_key:data.accessToken,
                        secondary_key:data.refreshToken}});

                        console.log(user,"INREOEP")
            return user.map((x:any)=>{
            return {
                id:x.id,
                primary_key:x.primary_key,
                }
            })
        } catch (error:any) {
            console.log(error, "error")
            Promise.reject("Error occured while updating video.")
        }
    }
}