import { userRepo } from "../../repo";
import { VerifyUserEmail } from "./verifyUserEmail";
import { VerifyUserEmailController } from "./verifyUserEmailController";

const verifyUserEmail = new VerifyUserEmail(userRepo);
const verifyUserEmailController = new VerifyUserEmailController(
    verifyUserEmail
);

export { verifyUserEmailController, verifyUserEmail };
