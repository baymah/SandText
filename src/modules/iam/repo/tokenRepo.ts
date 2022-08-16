import { Token } from "../domain/token";
import { UserTokens } from "../domain/userToken";
// import { UserTokens } from "../domain/userTokens";

export interface TokenRepo {
    delete(token: Token): Promise<void>;
    saveBulk(userTokens: UserTokens): Promise<void>;
    save(token: Token): Promise<void>;
}
