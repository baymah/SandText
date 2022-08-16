import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { BusinessCreated } from "./events/businessCreated";
import { BusinessEmail } from "./valueObjects/businessEmail";
import { BusinessId } from "./businessId";
import { UserId } from "./userId";


interface BusinessProps {
    userId: UserId;
    businessName:string,
    businessEmail:BusinessEmail,
    location:string,
    position:string,
    videoRange:string,
    uploadFrequency:string,

    createdAt?: Date;
    updatedAt?: Date;
}

export class Business extends AggregateRoot<BusinessProps> {
    
    get businessId(): BusinessId{
        return BusinessId.create(this._id).getValue();
    }

    get userId(): UserId {
        return this.props.userId;
    }

    get businessName(): string {
        return this.props.businessName;
    }

    get businessEmail(): BusinessEmail {
        return this.props.businessEmail;
    }
    get location(): string {
        return this.props.location;
    }

    get position(): string {
        return this.props.position;
    }

    get videoRange(): string {
        return this.props.videoRange;
    }
    get uploadFrequency(): string {
        return this.props.uploadFrequency;
    }

    constructor(userProps: BusinessProps, id?: UniqueEntityID) {
        super(userProps, id);
    }

    public static create(props: BusinessProps, id?: UniqueEntityID): Result<Business> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.userId, argumentName: "userId" },
            { argument: props.businessName, argumentName: "businessName" },
            { argument: props.businessEmail, argumentName: "businessEmail" },
            { argument: props.videoRange, argumentName: "videoRange" },
            { argument: props.position, argumentName: "position" },
            { argument: props.location, argumentName: "location" },
            { argument: props.uploadFrequency, argumentName: "uploadFrequency" },
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<Business>(guardResult.message || "");
        }

        const business = new Business({...props},id);
        const isNewUser = !id;

        if (isNewUser) {
            business.addDomainEvent(new BusinessCreated(business));
        }

        return Result.ok<Business>(business);
    }
}
