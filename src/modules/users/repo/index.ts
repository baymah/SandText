
import { TypeormUserRepo } from "./implementations/typeOrmUserRepo";
import {User} from "../../../infra/database/typeorm/entity/User";

const userRepo = new TypeormUserRepo(User);

export { userRepo }
