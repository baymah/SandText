import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { notEmpty } from "../../../shared/utils/typeUtils";
import { User } from "../domain/user";
import { UserTokens } from "../domain/userToken";
import { JWTClaims } from "../domain/valueObjects/jwt";
import { UserEmail } from "../domain/valueObjects/userEmail";
import { UserPassword } from "../domain/valueObjects/userPassword";
import { UserDTO } from "../dtos/userDTO";
import { RawToken, TokenMap } from "./token.Map";



export type RawUser = {
    id: string;
    email:any;
    password:any;
    tokens?: RawToken[];
    firstname: string;
    lastname?: string;
    username?:string;
    email_verified:number;
};

export class UserMap {


    public static toDTO(user: User): UserDTO {
        return {
            email:"",
            userId:''
        };
    }

    public static toJWTClaim(user: User): JWTClaims {
        return {
            userId: user.userId.id.toString(),
            email:user.email.value
        };
    }

    public static toRequestUserDTO(user: User): RequestUserDTO {
        return {
            userId: user.userId.id.toString(),
        };
    }

    //toDomain
    public static toDomain(raw: RawUser): User {
        const userPasswordOrError = UserPassword.create({
            value:raw.password,
            hashed:true
        })
        const userEmailOrError = UserEmail.create(raw.email);
        const tokens = raw.tokens?.map(TokenMap.toDomain);
        const userTokens = tokens
            ? UserTokens.create(tokens.filter(notEmpty))
            : UserTokens.create([]);
        const userOrError = User.create(
            {
                email: userEmailOrError.getValue(),
                passwordHash: userPasswordOrError.getValue(),
                firstname: raw.firstname,
                lastname: raw.lastname,
                tokens : userTokens
            },
            new UniqueEntityID(raw.id)
        );

        if (!userOrError.isSuccess) {
            throw new Error(userOrError.error as string);
        }
        return userOrError.getValue();
    }

    //toPersistence
    
    public static async toPersistence(user: User): Promise<RawUser> {
        let password: string;
        if (user.passwordHash.isAlreadyHashed()) {
            password = user.passwordHash.value;
        } else {
            password = await user.passwordHash.getHashedValue();
        }

        return {
            id: user.userId.id.toString(),
            firstname:user.firstname?user.firstname:"",
            lastname:user.lastname?user.lastname:"",
            email:user.email?user.email.value:"",
            email_verified:user.getVerificationStatus?user.getVerificationStatus:0,
            password:password,
        };
    }
}
