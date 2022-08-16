import { createLogger, transports, format } from "winston";
// import { ElasticsearchTransport } from "winston-elasticsearch";
import { esClient } from "../../infra/elastic/elasticSearchClient";
import LokiTransport from "winston-loki";
// import { config } from "../../config";
import jc from "json-cycle";

const { combine, timestamp, prettyPrint, json } = format;
// define the custom settings for each transport (file, console, es)

// Create a format to decycle the object
const decycleFormat = format((info, _opts) => jc.decycle(info));

// Combine the decycleFormat with the built-in json format.
const circularJsonFormat = combine(decycleFormat(), json());

// const { url, username, password, label } = config.grafana.loki;
const options = {
    file: {
        level: "info",
        filename: `./logs/app.log`,
        json: true,
        maxsize: 20242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(timestamp(), json()),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(timestamp(), prettyPrint()),
    },
    es: {
        level: "info",
        format: json(),
        client: esClient,
    },
    // loki: {
    //     host: url,
    //     json: true,
    //     basicAuth: `${username}:${password}`,
    //     labels: { job: label },
    //     format: circularJsonFormat,
    // },
};

let logger: any;

// Fixes jest detection of open handles during test run
if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
) {
    logger = createLogger({
        transports: [
            new transports.File(options.file),
            // new ElasticsearchTransport(options.es),
            // new LokiTransport(options.loki),
        ],
        exceptionHandlers: [
            new transports.File({ filename: "./logs/exceptions.log" }),
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
} else {
    logger = createLogger({
        exitOnError: false,
    });
}
logger.add(new transports.Console(options.console));

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
    write(message: any): void {
        // use the 'info' log level so the output will be picked up by both transports (es and console)
        logger.info("SERVER_RESPONSE", { response: JSON.parse(message) });
    },
};

export default logger;
