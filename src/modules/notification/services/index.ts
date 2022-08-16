
import { SlackService } from "./slack";
import {NodeMailerService} from './nodeMailer.ts'

const slackService = new SlackService();
const nodeMailerService = new NodeMailerService();

export {
  nodeMailerService,
  slackService
}