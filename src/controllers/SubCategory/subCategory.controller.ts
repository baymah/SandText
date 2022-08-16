import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  request,
  response,
  httpGet,
} from 'inversify-express-utils';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { client } from '../../middleware/require-auth';
import { customDataResponse, customNotFoundResponse } from '../../server-shared/src/response';
import { SubCategoryServiceImp } from './subCategory.service';


@controller('/v1/subcategories')
export class SubCategoryController{
  @inject(SERVICE_IDENTIFIERS.SUBCATEGORY_SERVICE)
  private subCategoryService!: SubCategoryServiceImp;

  @httpGet('/',client)
  async allCategory(
    @request() _req: Request,
    @response() res: Response
  ) {
    try {
        const categories = await this.subCategoryService.getAll();
        return customDataResponse(res,'Sub Categories fetch successfully',10,categories,'');
    } 
    catch (error:any) {
        return customNotFoundResponse(res,error.message,34,'');
    }
  }
}
