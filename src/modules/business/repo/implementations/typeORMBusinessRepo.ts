import { BusinessRepo } from "../businessRepo";
import { Business } from "../../domain/business";
import { BusinessMap } from "../../mappers/businessMap";

export class TypeORMBusinessRepo implements BusinessRepo {
    constructor(private BusinessEntity: any,) {}


    async getBusinessByUserId(userId: string): Promise<Business | undefined> {
        if (!userId) return undefined;
        const baseBusiness = await this.BusinessEntity.findOne(
            {
                id: userId,
            },
        );
        if (!baseBusiness) return undefined;
        return BusinessMap.toDomain(baseBusiness);
    }

    async save(business: Business): Promise<void> {
        const rawBusiness = await BusinessMap.toPersistence(business);
        console.log(rawBusiness,"Joo");

        const businessEntity: any = this.BusinessEntity.create(rawBusiness);
        await businessEntity.save();
    }


}
