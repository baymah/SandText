import express from "express";
import cors from "cors";
import helmet from "helmet";
import { v1Router } from "./infra/http/v1";
// import "./infra/http/middleware/bugsnag";
import Bugsnag from "@bugsnag/js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./infra/http/middleware";
import { morganMiddleware } from "./infra/http/middleware/morganMiddleware";

export const app = express();

//#region Bugsnag
// const bugsnag = Bugsnag.getPlugin("express");
// if (bugsnag && process.env.NODE_ENV !== "development")
//     app.use(bugsnag.requestHandler);
//#endregion

app.set("PORT", Number(process.env.PORT) || 3000);

app.use(helmet());
// Leave stripe webhook body as raw
app.use("/v1/payments/process-stripe", bodyParser.raw({ type: "*/*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(morganMiddleware);

app.get("/", (_req, res) => {
    return res.status(200).send({
        message: "Achee API",
        status: "success",
        data: { url: "https://api.achee.io/v1" },
    });
});
app.use("/v1", v1Router);

// if (bugsnag && process.env.NODE_ENV !== "development")
//     app.use(bugsnag.errorHandler);

app.use(errorMiddleware);

app.use("*", (_req, res) => {
    res.status(404).json({
        message: "URL Not Found",
        status: "error",
        data: null,
    });
});
