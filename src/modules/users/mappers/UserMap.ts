import { Mapper } from '../../../shared/infra/Mapper'
import { User } from '../domain/User';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserDTO } from '../domain/dtos/UserDto';


export class UserMap implements Mapper<User> {

  public static toDTO (user: User): UserDTO {
    return {
      username: user.username.value,
    }
  }


  public static toDomain (raw: any): User|null {
    const userNameOrError = UserName.create({ name: raw.username });
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create({
      username: userNameOrError.getValue(),
      isDeleted: raw.is_deleted,
      email: userEmailOrError.getValue(),
    }, new UniqueEntityID(raw.base_user_id));

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }


  public static async toPersistence (user: User): Promise<any> {
    let password: string|null = null;

    return {
      base_user_id: user.userId.id.toString(),
      user_email: user.email.value,
      user_password: password,
    }
  }
}