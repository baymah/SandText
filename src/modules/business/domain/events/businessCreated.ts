import { IDomainEvent } from "../../../../shared/core/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Business } from "../business";

export class BusinessCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public business: Business;

    constructor(business: Business) {
        this.dateTimeOccurred = new Date();
        this.business = business;
    }

    getAggregateId(): UniqueEntityID {
        return this.business.id;
    }
}
