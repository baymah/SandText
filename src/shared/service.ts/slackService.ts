import { IncomingWebhook } from "@slack/webhook";
import logger from "../core/Logger";

// Read a url from the environment variables
const apiLogs =
    "https://hooks.slack.com/services/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";

// Initialize
const apiLogsHook = new IncomingWebhook(apiLogs);

export const hooksMap: Record<string, IncomingWebhook> = {
    apiLog: apiLogsHook,
};

export const slackNotify = async (text: string, hook = "apiLog") => {
    if (process.env.NODE_ENV === "production") {
        try {
            const webhook = hooksMap[hook] || apiLogsHook;
            await webhook.send({ text });
        } catch (notifyError) {
            logger.error(notifyError);
        }
    } else {
        logger.info(`slackNotify-${hook}`, { text });
    }
};
