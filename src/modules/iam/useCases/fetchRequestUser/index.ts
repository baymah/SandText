import { userRepo } from "../../repo";
import { authService } from "../../service";
import { FetchRequestUser } from "./fetchRequestUser";

export const fetchRequestUser = new FetchRequestUser(userRepo, authService);
