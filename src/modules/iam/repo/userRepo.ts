import { User } from "../domain/user";
import { UserEmail } from "../domain/valueObjects/userEmail";

export interface UserRepo {
    save(user: User): Promise<void>;
    getUserByUserId(userId: string): Promise<User | undefined>;
    getUserByEmail(userName: UserEmail | string): Promise<User | undefined>;
}
