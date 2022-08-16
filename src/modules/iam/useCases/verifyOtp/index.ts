// import { userRepo, organizationRepo, roleRepo } from "../../repos";
// import verifyOtpController from "../../../../controllers/verifyOtp.controller";
import { userRepo } from "../../repo";
import { authService } from "../../service";
import { VerifyOtp } from "./verifyOtp";
import {VerifyOtpController } from "./verifyOtpController";
// import { authService } from "../../service";

const verifyOtp = new VerifyOtp(userRepo,authService);
const userVerifyOtpController = new VerifyOtpController(verifyOtp);

export { userVerifyOtpController };
