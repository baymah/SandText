import logger from "../../../shared/core/Logger";
import { EmailVerified } from "../domain/events/emailVerified";
import { config } from "../../../config";
import { DomainEvents, RegisterCallback } from "../../../shared/core/events/DomainEvents";
import { IHandle } from "../../../shared/core/events/IHandle";
import { VerificationStatus } from "../dtos/userDTO";
import { VerifyUserAccount } from "../useCases/verifyUserAccount.ts/verifyUserAccount";

export class AfterEmailVerified implements IHandle<EmailVerified> {
    constructor(
        private verifyUserAccount: VerifyUserAccount,
    ) {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        // Register to the domain event
        DomainEvents.register(
            this.onEmailVerified.bind(this) as RegisterCallback,
            EmailVerified.name
        );
    }

    private async onEmailVerified(event: EmailVerified): Promise<void> {
        const { user } = event;

        try {
            await this.verifyUserAccount.execute({
                userId: user.userId.id.toString(),
                verificationStatus: VerificationStatus.Verified,
            });

            logger.info(
                `[AfterEmailVerified]: Successfully set the user email-verified field to 1`,
                { userId: user.userId, email: user.email }
            );
        } catch (err) {
            logger.error(
                `[AfterEmailVerified]: Failed to set the user email-verified field to 1.`,
                { userId: user.userId, email: user.email }
            );
        }
    }
}
