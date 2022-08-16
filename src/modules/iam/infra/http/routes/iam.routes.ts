import { Router } from "express";
import { authMiddleware } from "../../../../../infra/http/middleware";
import {
    userSignupController,
} from "../../../useCases/createUser";
import { loginController } from "../../../useCases/login";
import { requestEmailVerificationController } from "../../../useCases/requestEmailVerification";
import { userVerifyOtpController } from "../../../useCases/verifyOtp";
import { verifyUserEmailController } from "../../../useCases/verifyUserEmail";

const iamRouter = Router();


iamRouter.post("/register", (req, res) => userSignupController.execute(req, res));
iamRouter.post("/login", (req, res) => loginController.execute(req, res));
iamRouter.post("/verify-otp", (req, res) => userVerifyOtpController.execute(req, res));
iamRouter.post("/me/verify-email", authMiddleware.authenticate(), (req, res) =>
    requestEmailVerificationController.execute(req, res)
);
iamRouter.patch("/me/verify-email", authMiddleware.authenticate(), (req, res) =>
    verifyUserEmailController.execute(req, res)
);

export { iamRouter };
