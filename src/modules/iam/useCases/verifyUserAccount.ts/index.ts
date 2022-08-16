import { VerifyUserAccount } from "./verifyUserAccount";
import { userRepo } from "../../repo";

const verifyUserAccount = new VerifyUserAccount(userRepo);
// const userVerifyOtpController = new VerifyOtpController(verifyOtp);

export { verifyUserAccount };
