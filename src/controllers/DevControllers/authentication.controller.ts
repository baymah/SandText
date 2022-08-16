import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  request,
  response,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import { pick } from 'lodash';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import SERVICE_IDENTIFIERS from '../../constant/identifier';
import { validate } from '../../middleware/validation';
import { customDataResponse, customDataResponseCreated, customNotFoundResponse } from '../../server-shared/src/response';
import { createDevUser,loginDevUser } from '../../validation/Devuser/devUser.schema';
import { AuthenticationServiceImp } from './authentication.service';
import crypto from 'crypto';
import { KeyStoreServiceImp } from '../KeyStore/keySoreService';
import { createTokens, getAccessToken, validateTokenData } from '../../common/utils/auth-utils';
import JWT from '../../cores/JWT';
import { ApiError, AuthFailureError, AuthFailureErrorRespones, ErrorType } from '../../cores/ApiError';
import { AuthFailureResponseExec, TokenRefreshResponse } from '../../cores/ApiResponse';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage });


@controller('/v1/auth')
export class AuthenticatonController{
  @inject(SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
  private authentiocationService!: AuthenticationServiceImp;

  @inject(SERVICE_IDENTIFIERS.KEYSTORE_SERVICE)
  private keystoreService!: KeyStoreServiceImp

  @httpGet('/')
  async allUserDetails(
    @request() _req: Request,
    @response() res: Response
  ) {
    try {
        const authUser = await this.authentiocationService.getAll()
        return res.status(200).json({data:authUser})
    } 
    catch (error:any) {
        return error.message
    }
  }

  @httpGet('/user-details')
  async allUserRelationDetails(
    @request() _req: Request,
    @response() res: Response
  ) {
    try {
        const authUser = await this.authentiocationService.getDevUserDetails()
        return customDataResponse(res,'User fetched successfully',10,authUser,'');
    } 
    catch (error:any) {
        return error.message
    }
  }

  @httpPost('/',upload.single('t'),validate({ schema: createDevUser }))
  async registerUser(
    @request() req: Request,
    @response() res: Response
  ){
    try {
      let attr: any = pick(req.body, ['name','phone','password','email','company_name','what_you_are_building']);
      let userAttributes: any = {
        ...attr,
        password: await bcrypt.hash(req.body.password, 10)
        // phone: parsePhone(attr.phone),
      };
      if(userAttributes.company_name){
        const userName = await this.authentiocationService.getByName(userAttributes.company_name);
        if(userName) return customNotFoundResponse(res,`Forbidden, Name ${userAttributes.company_name} already exists in the storage`,36,'')
      }

      if (userAttributes.phone) {
        // const parsedPhone = parsePhone(userAttributes.phone);
        const userAccount = await this.authentiocationService.getByPhone(userAttributes.phone);
        if (userAccount) {
          return customNotFoundResponse(res,`Forbidden,PhoneNumber ${userAttributes.phone} already exists in the storage.`,36,'');
        }
      }
      if (userAttributes.email) {
        const userAccount = await this.authentiocationService.getByEmail(userAttributes.email);
        if (userAccount) {
          return customNotFoundResponse(res,`Forbidden,Email ${userAttributes.email} already exists in the server.`,36,'');
        }
      }
      const authUser = await this.authentiocationService.save(userAttributes)

      return customDataResponseCreated(res,'Account created successfully, kindly check your email address',11,authUser,'');
    } catch (error:any) {
      return res.status(400).json({
        status:'failed',
        message:`Something went wrong while processing the request`,
        response_code:34,
        provider:''
      })
    }
  }

  @httpPost('/login',upload.single('t'),validate({schema:loginDevUser}))
  async login(
    @request() req: Request,
    @response() res: Response
  ){
    try {
      console.log(req.body)
      const user = await this.authentiocationService.getByEmail(req.body.email);
      if (!user) return customNotFoundResponse(res,`User not registered.`,36,'');
      if (!user.password) return customNotFoundResponse(res,`Credential not set.`,36,'');;
  
      const match = await bcrypt.compare(req.body.password, user.password);
      // if (!match) throw new AuthFailureError('Authentication failure');
      if(!match) return customNotFoundResponse(res,`Authentication failure, Incorrect password.`,36,'');
      
      const accessTokenKey = crypto.randomBytes(64).toString('hex');
      const refreshTokenKey = crypto.randomBytes(64).toString('hex');

      const keyStorePayload ={
        user_id:user.id,
        primary_key:accessTokenKey,
        secondary_key:refreshTokenKey
      }

      // check if the keystore exist for the user if yes dekete or update with the new one...
    // await this.keystoreService.save(keyStorePayload);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    console.log(tokens,"GENERATED TOKEN")
      return customDataResponse(res,'Login Success',10,{user:pick(user, ['id', 'name','email', 'phone','access_token','public_key','private_key']),token:tokens},'');
    }
    catch(error:any){
      return customNotFoundResponse(res,error.message,34,'');
    }
  }


  // @httpPost('/refresh',upload.single('t'))
  // async refreshToken( 
  //   @request() req: Request,
  //   @response() res: Response){
  //     req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
  //     const accessTokenPayload = await JWT.decode(req.accessToken);

  //     validateTokenData(accessTokenPayload);
  
  //     const user = await this.authentiocationService.getById(accessTokenPayload.sub)
      
  //     if (!user) throw new AuthFailureError('User not registered');
  //     req.user = user;

  //     const refreshTokenPayload = await JWT.validate(req.body.refreshToken);

  //     validateTokenData(refreshTokenPayload);
  
  //     if (accessTokenPayload.sub !== refreshTokenPayload.sub)
  //       throw new AuthFailureError('Invalid access token');

  //     const keyPayload ={
  //       user_id:user.id,
  //       accessToken:accessTokenPayload.prm,
  //       refreshToken:refreshTokenPayload.prm,
  //     }
  //     const keystore = await this.keystoreService.findByCriteria(
  //       keyPayload
  //     );

  //     // if (!keystore.length) throw new AuthFailureErrorRespones(ErrorType.UNAUTHORIZED,'Invalid access token',res).handle();
  //     if(!keystore.length) throw new  AuthFailureResponseExec('Invalid access token',"",).send(res);
  //     await this.keystoreService.remove(keystore[0].id);
  //     const accessTokenKey = crypto.randomBytes(64).toString('hex');
  //     const refreshTokenKey = crypto.randomBytes(64).toString('hex');

  //     const keyStorePayload ={
  //       user_id:user.id,
  //       primary_key:accessTokenKey,
  //       secondary_key:refreshTokenKey
  //     }
  //     await this.keystoreService.save(keyStorePayload);
  //     const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
  
  //     new TokenRefreshResponse('Token Issued',"", tokens.accessToken, tokens.refreshToken).send(res);
  //   }
}
