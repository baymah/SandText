import { Request, Response ,NextFunction} from 'express';
import { inject } from 'inversify';
import {
  controller,
  request,
  response,
  httpGet,
  httpPost,
  queryParam,
  next,
} from 'inversify-express-utils';
import { pick } from 'lodash';
import multer from 'multer';
import Logger from '../../cores/Logger';
import { ProductServiceImp } from './product.service';
import { client } from '../../middleware/require-auth';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { CategoryServiceImp } from '../category/category.service';
import { SubCategoryServiceImp } from '../SubCategory/subCategory.service';
import { customDataResponse, customNotFoundResponse, customResponseCreated } from '../../server-shared/src/response';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage,fileFilter(req, file, cb) {
  if (!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
    req.fileValidationError = 'Unsupported Media Type';
    Logger.warn(`${req.fileValidationError}$: Date{${new Date()}} :File type uploaded ${file.mimetype}, AccessToken:: ${req.userRequest.accessToken[0].access_token}, PublicKey:: ${req.userRequest.public_key}`)
   }
  cb(null, true)
} });


@controller('/v1')
export class ProductController{
  @inject(SERVICE_IDENTIFIERS.PRODUCT_SERVICE)
  private productService!: ProductServiceImp;

  @inject(SERVICE_IDENTIFIERS.CATEGORY_SERVICE)
  private categoryService!: CategoryServiceImp;

  @inject(SERVICE_IDENTIFIERS.SUBCATEGORY_SERVICE)
  private subCategoryService!: SubCategoryServiceImp;

  @httpGet('/product',client)

  async products(
    @queryParam("take") take: number, 
    @queryParam("page") page: number,
    @request() _req: Request,
    @response() res: Response
  ) {
    try {
        const product = await this.productService.getAll(take,page);
        return customDataResponse(res,'Products fetch successfully',10,{product},'');
    } 
    catch (error:any) {
        return customNotFoundResponse(res,error.message,34,'');
    }
  }

  @httpPost('/create_product',client,upload.single('t'))
  async createProduct(
    @request() req: Request,
    @response() res: Response
  ){
    try {
      //get the promovideoId and check if the id exist
      let attr: any = pick(req.body, ['name','brand','description','slug','category','subcategory','price','colors','currency','quantity']);
      let productAttributes: any = {
        ...attr,
      };
      const category:any = await this.categoryService.getById(productAttributes.category);
      if(!category) return customNotFoundResponse(res,`Category with id ${productAttributes.category} not found`,35,'');
      const subcat:any = await this.subCategoryService.getById(productAttributes.subcategory)
      if(!subcat) return customNotFoundResponse(res,`SubCategory with id ${productAttributes.subcategory} not found`,35,'');
      // video id is null
      const product =await this.productService.save(productAttributes,req.userRequest);
      console.log(product,"====PRODUCT====")
      return customResponseCreated(res,'Product created successfully',11,'');
    } catch (error:any) {
      return res.status(400).json({
        status:'failed',
        // message:`Something went wrong while processing the request`,
        message:error,
        response_code:34,
        provider:''
      })
    }
  }
  @httpPost('/product/:productId/upload_product',client,upload.array('product_image'))
  async uploadProductFile(
    @request() req: Request,
    @response() res: Response,
    @next() _next:NextFunction
  ){
    try {
      if(req.fileValidationError) return customNotFoundResponse(res,req.fileValidationError,31,'')
      
           if(!req.files?.length) return customNotFoundResponse(res,"Produc file must be uploaded",34,'');
           const product_file = req.files as any
           const product =await this.productService.getById(req.params.productId);
                if(!product) return customNotFoundResponse(res,"Product with id not found",35,'');
          
            return await this.productService.uploadProductFile(product_file,req.userRequest,req.params.productId).then((_result:any) => {
            return customResponseCreated(res,'Products picture saved successfully',11,'');
              // return res.status(200).json({ success: true, data: result });
        }).catch((error:any) => {
            return res.status(400).send({
                status: false,
                message: error.message
            });
        })
    } catch (error:any) {
      return customNotFoundResponse(res,error.message,34,'');
    }
  }
}
