import { IDomainEvent } from "../../../../shared/core/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { User } from "../user";

export class EmailVerified implements IDomainEvent {
    public dateTimeOccurred: Date;
    public user: User;

    constructor(user: User) {
        this.dateTimeOccurred = new Date();
        this.user = user;
    }

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}
