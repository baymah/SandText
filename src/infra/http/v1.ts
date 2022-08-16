import express from "express";
import swaggerUi = require("swagger-ui-express");
import { business } from "../../modules/business/infra/http/routes/business.routes";
import { iamRouter } from "../../modules/iam/infra/http/routes/iam.routes";
import swaggerDocument from "./swagger.json";

export const v1Router = express.Router();

v1Router.get("/", (_req, res) => {
    return res.status(200).send({
        message: "Edekee Third-P{arty} API",
        status: "success",
        data: { message: "Edekee ThirdParty API version 1" },
    });
});

v1Router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
v1Router.use("/users", iamRouter);
v1Router.use("/business",business)

