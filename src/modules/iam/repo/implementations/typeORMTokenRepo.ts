import { Token } from "../../domain/token";
import { UserTokens } from "../../domain/userToken";
import { TokenMap } from "../../mappers/token.Map";
import { TokenRepo } from "../tokenRepo";

export class TypeORMTokenRepo implements TokenRepo {
    constructor(private TokenEntity: any) {}

    async delete(token: Token): Promise<void> {
        const rawToken = TokenMap.toPersistence(token);

        const tokenEntity: any = this.TokenEntity.create(rawToken);
        await tokenEntity.remove();

        return;
    }

    async saveBulk(tokens: UserTokens): Promise<void> {
        for (const token of tokens.getRemovedItems()) {
            await this.delete(token);
        }

        for (const token of tokens.getNewItems()) {
            await this.save(token);
        }
    }

    async save(token: Token): Promise<void> {
        const rawToken = TokenMap.toPersistence(token);

        const tokenEntity: any = this.TokenEntity.create(rawToken);
        await tokenEntity.save();
        return;
    }
}
