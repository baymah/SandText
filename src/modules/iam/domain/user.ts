import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { UserId } from "./userId";
import { Guard } from "../../../shared/core/Guard";
import { UserEmail } from "./valueObjects/userEmail";
import { UserPassword } from "./valueObjects/userPassword";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { password } from "../../../../ormconfig";
import { UserCreated } from "./events/userCreated";
import { UserTokens } from "./userToken";
import { Token, TokenType } from "./token";
import { EmailTokenCreated } from "./events/emailTokenCreated";
import { Domain } from "domain";
import { DomainEvents } from "../../../shared/core/events/DomainEvents";
import { EmailVerified } from "./events/emailVerified";
import { VerificationStatus } from "../dtos/userDTO";

export interface UserProps {
    firstname?: string;
    lastname?: string;
    email: UserEmail;
    tokens: UserTokens;
    verificationStatus?:number;
    passwordHash: UserPassword;
}

export class User extends AggregateRoot<UserProps> {
    get userId(): UserId {
        return UserId.create(this._id).getValue();
    }
    get email(): UserEmail {
        return this.props.email;
    }
    get firstname(): string | undefined {
        return this.props.firstname;
    }
    get lastname(): string | undefined {
        return this.props.lastname;
    }
    get passwordHash(): UserPassword {
        return this.props.passwordHash;
    }
    get tokens(): UserTokens {
        return this.props.tokens;
    }

    get getVerificationStatus(): number |undefined  {
        return this.props.verificationStatus;
    }

    public getTokenByType(type: TokenType): Token | undefined {
        return this.props.tokens?.getItems().find((token) => token.type == type);
    }
    private verifyToken(token: string, tokenType: TokenType): Result<void> {
        const foundToken = this.getTokenByType(tokenType);
        if (!foundToken || token !== foundToken.id.toString()){
            return Result.fail("Invalid Token");
        }
        if (foundToken.hasExpired()) return Result.fail("Expired Token");

        this.removeToken(foundToken);
        return Result.ok();
    }

    public removeToken(token: Token) {
        this.props.tokens.remove(token);
    }

    public addEmailVerificationStatus(verificationStatus:number){
        this.props.verificationStatus=verificationStatus;
    }

    public verifyEmail(token: string): Result<void> {
        const result = this.verifyToken(token, TokenType.EmailVerification);
        if (result.isFailure) return result;

        this.addDomainEvent(new EmailVerified(this));
        return Result.ok();
    }
    public addToken(token: Token) {
        const foundToken = this.getTokenByType(token.type);
        if (foundToken) this.props.tokens.remove(foundToken);
        this.props.tokens.add(token);
        this.addDomainEvent(new EmailTokenCreated(this));
        return this;
    }
    public dispatchAggregate(id:any){
        DomainEvents.dispatchEventsForAggregate(id)
    }

    constructor(userProps: UserProps, id?: UniqueEntityID) {
        super(userProps, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.firstname, argumentName: "firstname" },
            { argument: props.lastname, argumentName: "lastname" },
            { argument: props.email, argumentName: "email" },
            { argument: props.passwordHash, argumentName: "passwordHash" },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message || "");
        }

        const user = new User({...props},id);
        const isNewUser = !id;

        if (isNewUser) {
            user.addDomainEvent(new UserCreated(user));
        }

        return Result.ok<User>(user);
    }
}
