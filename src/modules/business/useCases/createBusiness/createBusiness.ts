import { CreateBusinessDTO, CreateBusinessDTOSchema, RegisterDTOResponse } from "./createBusinessDTO";
import * as CreateBusinessError from "./createBusinessError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import * as AppError from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import { joiValidate } from "../../../../shared/utils/typeUtils";
import { UserRepo } from "../../../iam/repo/userRepo";
import { AuthService } from "../../../iam/service/authService";
import { Business } from "../../domain/business";
import { BusinessEmail } from "../../domain/valueObjects/businessEmail";
import { BusinessRepo } from "../../repo/businessRepo";
import { businessRepo } from "../../repo";
import { UserId } from "../../domain/userId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { BusinessMap } from "../../mappers/businessMap";
import { BusinessDTO } from "../../dtos/businessDTO";


type Response = Either<
    | CreateBusinessError.UserDoesNotExistError
    | AppError.UnexpectedError
    | AppError.PermissionsError
    | AppError.InputError,
    Result<BusinessDTO>
>;


export class CreateBusiness implements UseCase<CreateBusinessDTO, Promise<Response>> {
    private businessRepo: BusinessRepo;

    constructor(
        businessRepo: BusinessRepo,
    ) {
        this.businessRepo = businessRepo;
    }
    async execute(request: CreateBusinessDTO): Promise<Response> {
        
        const { error, value: vRequest } = joiValidate<CreateBusinessDTO>(
            CreateBusinessDTOSchema,
            request
        );
        if (error) return left(new AppError.InputError(error.message));

        let {businessName,location,position,uploadFrequency,videoRange,requestUser:rawRequestUser } = vRequest;

        //Todo
        //1)check if the user has already created a business before... 

        //#region Create Business Valid Value Objects
        const businessEmailOrError = BusinessEmail.create(vRequest.businessEmail);
        if (businessEmailOrError.isFailure && businessEmailOrError.error) {
            return left(new AppError.InputError(businessEmailOrError.error));
        }

         const businessEmail = businessEmailOrError.getValue();

        //  #endregion
        
        try {
            const businessOrError:Result<Business> = Business.create({
                userId:UserId.create(new UniqueEntityID(rawRequestUser?.userId)).getValue(),
                businessEmail,
                businessName,
                location,
                position,
                videoRange,
                uploadFrequency,	
                // requestUser: RequestUserDTO;
            })

            console.log(businessEmailOrError,"businessError")
            if (businessOrError.isFailure && businessOrError.error) {
                return left(new AppError.InputError(businessOrError.error));
            }

            const business: Business = businessOrError.getValue();
            // create business
            await businessRepo.save(business);

            return right(
                Result.ok<BusinessDTO>(BusinessMap.toDTO(business))
            );
        } catch (err) {
            return left(
                new AppError.UnexpectedError(
                    err,
                    this.constructor.name,
                    request
                )
            );
        }
    }
}
