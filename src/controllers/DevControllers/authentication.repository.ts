import { injectable } from 'inversify';
import { pick } from 'lodash';
import { getRepository } from 'typeorm';
import { Dev_User } from '../../infra/database/typeorm/entity/Dev_User';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class AuthenticationRepository extends GenericRepositoryImp<Dev_User> {
    constructor() {
        super(getRepository("dev_users"));
    }

    async getDevUserDetails():Promise<any>{
        try {
            const user = await this.repository.find({relations:['access_token','product_key']});
            return user.map((x:any)=>{
                email:x.email,
                console.log(x,"X-value",pick(x.access_token,['token']))
            return {
                id:x.id,
                name:x.name,
                email:x.email,
                phone:x.phone,
                company_name:x.company_name,
                what_you_are_building:x.what_you_are_building,
                access_token:pick(x.access_token,['token']).token,
                public_key:pick(x.product_key,['public_key']).public_key,
                private_key:pick(x.product_key,['private_key']).private_key,
            }
            
            })
            
        } catch (error:any) {
            console.log(error, "error")
            Promise.reject("Error occured while updating video.")
        }
    }

    async getUserByEmailRelation(email:string):Promise<any>{
        try {
            const user = await this.repository.find({where:{email},relations:['access_token','product_key']});
            return user.map((x:any)=>{
                email:x.email,
                console.log(x,"X-value",pick(x.access_token,['token']))
            return {
                id:x.id,
                name:x.name,
                email:x.email,
                password:x.password,
                phone:x.phone,
                company_name:x.company_name,
                what_you_are_building:x.what_you_are_building,
                access_token:pick(x.access_token,['token']).token,
                public_key:pick(x.product_key,['public_key']).public_key,
                private_key:pick(x.product_key,['private_key']).private_key,
            }
            
            })
            
        } catch (error:any) {
            console.log(error, "error")
            Promise.reject("Error occured while updating video.")
        }
    }
}