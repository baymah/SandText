
import { SendEmailMessage } from "./sendEmailMessage";
import { nodeMailerService } from "../../services";

const mailService = new SendEmailMessage(nodeMailerService,);

export {
  mailService
}