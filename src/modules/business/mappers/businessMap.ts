import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Business } from "../domain/business";
import { UserId } from "../domain/userId";
import { BusinessEmail } from "../domain/valueObjects/businessEmail";
import { BusinessDTO } from "../dtos/businessDTO";



export type RawBusiness = {
    id: string;
    user_id:string
    business_email:any;
    business_name:string;
    location:string;
    position:string;
    uploadFrequency:string;
    videoRange:string

};

export class BusinessMap {

    public static toDTO(business: Business): BusinessDTO {
        return {
            businessEmail:business.businessEmail.value,
            businessName:business.businessName
        };
    }

    public static toRequestUserDTO(business: Business): any {
        return {
            userId: business.id.toString(),
        };
    }

    //toDomain
    public static toDomain(raw: RawBusiness): Business {

        const businessEmailOrError = BusinessEmail.create(raw.business_email);

        const userOrError = Business.create(
            {
                userId:UserId.create(
                    new UniqueEntityID(raw.user_id)
                ).getValue(),
                businessEmail: businessEmailOrError.getValue(),
                businessName:raw.business_name,
                location:raw.location,
                position:raw.position,
                uploadFrequency:raw.uploadFrequency,
                videoRange:raw.videoRange,
            },
            new UniqueEntityID(raw.id)
        );

        if (!userOrError.isSuccess) {
            throw new Error(userOrError.error as string);
        }
        return userOrError.getValue();
    }

    //toPersistence
    
    public static async toPersistence(business: Business): Promise<RawBusiness> {
        return {
            id: business.businessId.id.toString(),
            user_id: business.userId.id.toString(),
            business_email:business.businessEmail.value,
            business_name:business.businessName,
            location:business.location,
            position:business.position,
            uploadFrequency:business.uploadFrequency,
            videoRange:business.videoRange
        };
    }
}
