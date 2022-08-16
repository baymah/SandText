
import { AfterUserCreated } from "./afterUserCreated";
import { notifySlackChannel } from "../useCases/notifySlackChannel";
// import {nodeMailerMessageService} from '../useCases/'
import { mailService } from "../useCases/sendEmailMessage";

// Subscribers
new AfterUserCreated(notifySlackChannel,mailService);