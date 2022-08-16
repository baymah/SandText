import { LoginController } from "./loginController";
import { LoginUseCase } from "./login";
import { userRepo } from "../../repo";
import { authService } from "../../service";

const loginUseCase = new LoginUseCase(userRepo, authService);

const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase };
