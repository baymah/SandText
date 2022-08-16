import { UserId } from "./UserId";
import { UserEmail } from "./UserEmail";
import { AggregateRoot } from "../../../shared/core/AggregateRoot";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/core/UniqueEntityID";
import { UserName } from "./UserName";


interface UserProps {
    email: UserEmail;
    username: UserName;
    // password: UserPassword;
    // isEmailVerified?: boolean;
    // isAdminUser?: boolean;
    // accessToken?: JWTToken;
    // refreshToken?: RefreshToken;
    isDeleted?: boolean;
    lastLogin?: Date;
  }

export class User extends AggregateRoot<UserProps> {

  get userId(): UserId {
      return UserId.create(this._id).getValue();
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get username ():UserName{
    return this.props.username
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue())
    }

    const isNewUser = !!id === false;
    const user = new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
      // isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      // isAdminUser: props.isAdminUser ? props.isAdminUser : false
    }, id);

    if (isNewUser) {
      // user.addDomainEvent(new UserCreated(user));
      console.log("User Created Event Triggered")
    }

    return Result.ok<User>(user);
  }

}