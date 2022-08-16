
//Env
import * as dotenv from "dotenv";
dotenv.config();
// Infra
// import "./shared/infra/http/app"
import { app } from "./app";



import logger from "./shared/core/Logger";
import "./infra/database/typeorm";
// import "./shared/infra/database/sequelize"

// Subscriptions
import "./modules/notification"
import "./modules/iam/subscribers"

app.listen(app.get("PORT"), () =>
    logger.info(`Server running on port ${app.get("PORT")}`, {
        port: app.get("PORT"),
    })
);