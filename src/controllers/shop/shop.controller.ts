import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  request,
  response,
  httpGet,
  next,
  httpPost,
} from 'inversify-express-utils';
import multer from 'multer';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { client } from '../../middleware/require-auth';
import { customNotFoundResponse } from '../../server-shared/src/response';
// import { serviceActivitiesRepo } from '../../repository';
import { ShopServiceImp } from './shop.service';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage });


@controller('/v1/shop')
export class ShopController{
  @inject(SERVICE_IDENTIFIERS.SHOP_SERVICE)
  private shopService!: ShopServiceImp;

  @httpGet('/')
  async shopDetails(
    @request() _req: Request,
    @response() res: Response,
    @next() _next: NextFunction
  ) {
    try {
        const shop = await this.shopService.getAll()
        return res.json(shop);
        
    } catch (error:any) {
      return customNotFoundResponse(res,error.message,34,'');
    }
  }

  @httpPost('/',client,upload.array('logo'))
  async createShop(
    @request() req: Request,
    @response() res: Response,
    @next() _next: NextFunction
  ) {
    try {
      // if(req.fileValidationError) return customNotFoundResponse(res,req.fileValidationError,31,'')
      if(!req.files) return customNotFoundResponse(res,"Produc file must be uploaded",34,'');
      const product_file = req.files as any
      // const product =await this.productService.getById(req.params.productId);
      //      if(!product) return customNotFoundResponse(res,"Product with id not found",35,'');
     
        const shop = await this.shopService.create(product_file,req.userRequest,req.body)
        return res.status(200).json({ success: true, data: shop });
    } catch (error:any) {
      return customNotFoundResponse(res,error.message,34,'');
    }
  }
}
