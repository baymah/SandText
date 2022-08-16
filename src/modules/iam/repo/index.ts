import { Dev_Token } from "../../../infra/database/typeorm/entity/Dev_Token";
import { Dev_User } from "../../../infra/database/typeorm/entity/Dev_User";
import { TypeORMUserRepo } from "./implementations/typeORMUserRepo";
import { TypeORMTokenRepo } from "./implementations/typeORMTokenRepo";


const tokenRepo = new TypeORMTokenRepo(Dev_Token);
const userRepo = new TypeORMUserRepo(Dev_User,tokenRepo);

export {userRepo};
