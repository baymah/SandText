import { UserRepo } from "../userRepo";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/valueObjects/userEmail";
import { UserTokens } from "../../domain/userToken";
import { TokenRepo } from "../tokenRepo";

export class TypeORMUserRepo implements UserRepo {
    constructor(private UserEntity: any,private tokenRepo: TokenRepo) {}

    async getUserByEmail(
        userEmail: UserEmail | string
    ): Promise<User | undefined> {
        if (!userEmail) return undefined;
        const baseUser = await this.UserEntity.findOne(
            {
                email:
                    userEmail instanceof UserEmail
                        ? userEmail.value
                        : userEmail,
            },
        );
        if (!baseUser) return undefined;
        return UserMap.toDomain(baseUser);
    }

    async getUserByUserId(userId: string): Promise<User | undefined> {
        if (!userId) return undefined;
        const baseUser = await this.UserEntity.findOne(
            {
                id: userId,
            },
            { relations: ["tokens"] }
        );
        if (!baseUser) return undefined;
        return UserMap.toDomain(baseUser);
    }

    async saveUserTokens(tokens: UserTokens) {
        await this.tokenRepo.saveBulk(tokens);
    }

    async save(user: User): Promise<void> {
        const rawUser = await UserMap.toPersistence(user);
        const userEntity: any = this.UserEntity.create(rawUser);
        await userEntity.save();

        if(user.tokens) await this.saveUserTokens(user.tokens);
        return
    }
}