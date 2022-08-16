import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../../iam/domain/user";
import { IMessageService } from "../../services/nodeMailer.ts";

interface Request {
    user:User,
    subject:string,
    message:string,
}

export class SendEmailMessage implements UseCase<Request, Promise<void>> {
  private nodeMailerService: IMessageService;

  constructor (nodeMailerService: IMessageService) {
    this.nodeMailerService = nodeMailerService;
  }

  async execute (req: Request): Promise<void> {
     this.nodeMailerService.sendMessage(req.user, req.subject,req.message);
  }
}

