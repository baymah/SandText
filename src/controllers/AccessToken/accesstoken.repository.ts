import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { AccessToken } from '../../infra/database/typeorm/entity/Access_Token';
import { GenericRepositoryImp } from '../../server-shared/src/database/repository';

@injectable()
export class AccessTokenRepository extends GenericRepositoryImp<AccessToken> {

    constructor() {
        super(getRepository(AccessToken));
    }
}