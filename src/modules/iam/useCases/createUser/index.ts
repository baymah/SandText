import { userRepo } from "../../repo";
import { authService } from "../../service";
import { CreateUser } from "./createUser";
import { UserSignupController } from "./userSignupController";

const createUser = new CreateUser(userRepo,authService);
const userSignupController = new UserSignupController(createUser);

export { userSignupController };
