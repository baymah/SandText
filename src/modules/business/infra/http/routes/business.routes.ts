import { Router } from "express";
import { authMiddleware } from "../../../../../infra/http/middleware";
import { createBusinessController } from "../../../useCases/createBusiness";

const business = Router();

business.post("/",authMiddleware.authenticate(), (req, res) => createBusinessController.execute(req, res)); 
export { business };
