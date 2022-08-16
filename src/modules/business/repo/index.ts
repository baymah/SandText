import { Business } from "../../../infra/database/typeorm/entity/Business";
import { TypeORMBusinessRepo } from "./implementations/typeORMBusinessRepo";

const businessRepo = new TypeORMBusinessRepo(Business);

export {businessRepo};
