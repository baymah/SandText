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
import { CategoryServiceImp } from './category.service';


@controller('/v1/categories')
export class CategoryController{
  @inject(SERVICE_IDENTIFIERS.CATEGORY_SERVICE)
  private categoryService!: CategoryServiceImp;

  @httpGet('/',client)
  async allCategory(
    @request() _req: Request,
    @response() res: Response
  ) {
    try {
        const categories = await this.categoryService.getAll();
        return customDataResponse(res,'Categories fetch successfully',10,categories,'');
    } 
    catch (error:any) {
        return customNotFoundResponse(res,error.message,34,'');
    }
  }

}
