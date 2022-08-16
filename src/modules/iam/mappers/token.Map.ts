import { Token, TokenType } from "../domain/token";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserId } from "../domain/userId";

export type RawToken = {
    id: string;
    user_id: string;
    type: TokenType;
    expires_at: Date;
    created_at?: Date;
    updated_at?: Date;
};

export class TokenMap {
    public static toDomain(raw: RawToken): Token | undefined {
        const userId = UserId.create(
            new UniqueEntityID(raw.user_id)
        ).getValue();

        const tokenOrError = Token.create(
            {
                type: raw.type,
                expiresAt: raw.expires_at,
                userId,
            },
            new UniqueEntityID(raw.id)
        );
        return tokenOrError.isSuccess ? tokenOrError.getValue() : undefined;
    }

    public static toPersistence(token: Token): RawToken {
        return {
            id: token.id.toString(),
            user_id: token.userId.id.toString(),
            type: token.type,
            expires_at: token.expiresAt,
        };
    }
}
