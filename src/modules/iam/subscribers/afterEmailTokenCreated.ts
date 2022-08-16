import { UserCreated } from "../../iam/domain/events/userCreated";
import { DomainEvents } from "../../../shared/core/events/DomainEvents";
import { EmailTokenCreated } from "../domain/events/emailTokenCreated";
import { IHandle } from "../../../shared/core/events/IHandle";
import { IMessageService } from "../../notification/services/nodeMailer.ts";
import logger from "../../../shared/core/Logger";
import { TokenType } from "../domain/token";

export class AfterEmailTokenCreated implements IHandle<EmailTokenCreated> {

    constructor(private emailService: IMessageService) {
        this.setupSubscriptions();
    }

  setupSubscriptions(): void {
    DomainEvents.register(this.onEmailTokenCreatedEvent.bind(this), EmailTokenCreated.name);
  }

  private craftSlackMessage (userId:string,token:string): string {
    return `<p>Welcome to Edekee app: your userId:  ${userId}: Token ${token}</p>`
  }

  private async onEmailTokenCreatedEvent (event: UserCreated): Promise<void> {
    const { user } = event;
    try {
        const newToken = user.tokens.getNewItems()[0];
        if (newToken.type === TokenType.EmailVerification) {
            const userId=user.userId.id.toString();
            const token=user.getTokenByType(TokenType.EmailVerification)?.id.toString() || "";
            await this.emailService.sendMessage(user,"Edekee",this.craftSlackMessage(userId,token));
        }
        logger.info(
            `[AfterEmailTokenCreated]: Successfully executed SendMail use case Email Token Created`,
            {
                userId: user.userId,
                email: user.email.value,
                tokenType: newToken.type,
            }
        );
    } catch (err) {
        logger.error(`[AfterEmailTokenCreated]: ${err.message}`, {
            userId: user.userId,
        });
    }
  }
}