import { IDomainEvent } from "../../../../shared/core/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { User } from "../user";

export class EmailTokenCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public user: User;

    constructor(user: User) {
        console.log(user,"inEmailTokenCraeted")
        this.dateTimeOccurred = new Date();
        this.user = user;
    }

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}
