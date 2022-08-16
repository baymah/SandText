import { NotifySlackChannel } from "../useCases/notifySlackChannel/NotifySlackChannel";
import { DomainEvents } from "../../../shared/core/events/DomainEvents";
import { IHandle } from "../../../shared/core/events/IHandle";
import { UserCreated } from "../../iam/domain/events/userCreated";
import { SendEmailMessage } from "../useCases/sendEmailMessage/sendEmailMessage";

export class AfterUserCreated implements IHandle<UserCreated> {
  private notifySlackChannel: NotifySlackChannel;
  private mailServiceUSecase: SendEmailMessage

  constructor (notifySlackChannel: NotifySlackChannel,mailServiceUSecase:SendEmailMessage) {
    this.setupSubscriptions();
    this.notifySlackChannel = notifySlackChannel;
    this.mailServiceUSecase = mailServiceUSecase;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreated.name);
  }

  //todo consider using the userId 
  private craftSlackMessage (user:any): string {
    return `<p>Welcome to Edekee app ${user.firstname} ${user.lastname}</p>`
  }

  private async onUserCreatedEvent (event: UserCreated): Promise<void> {
    console.log(event,"EVEBT")
    const { user } = event;

    console.log(user,"USER")

    try {
    await this.mailServiceUSecase.execute({user,subject:"Edekee",message:this.craftSlackMessage(user)})
    } catch (err) {
        console.log(err,"Error")
    }
  }
}