import { businessRepo } from "../../repo";
import { CreateBusiness } from "./createBusiness";
import { CreateBusinessController } from "./createBusinessController";

const createBusiness = new CreateBusiness(businessRepo);
const createBusinessController = new CreateBusinessController(createBusiness);

export { createBusinessController };
