import { Business } from "../domain/business";

export interface BusinessRepo {
    save(user: Business): Promise<void>;
    getBusinessByUserId(userId: string): Promise<Business | undefined>;
}
