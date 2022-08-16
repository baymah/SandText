import 'reflect-metadata'

import { config } from '../../../config'
import { User } from './entity/User'
import { Interest } from './entity/Interest'
import { OtpVerify } from './entity/Otp_Verifies'
import { Category } from './entity/Category'
import { Product } from './entity/Product'
import { ProductVideo } from './entity/Product_Video'
import { ProductPicture } from './entity/Product_Picture'
// import { ProductVideoMeta } from './entity/Product_Video_Meta'
import { Token } from './entity/Token'
import { SubCategory } from './entity/SubCategory'
import { Order } from './entity/Order'
import { OrderItem } from './entity/Order_Item'
import { Like } from './entity/Like'
import { ProductComment } from './entity/Product_Comments'
import { Brand } from './entity/Brand'
import { Color } from './entity/Color'
import { Cart } from './entity/Cart'
// import { ProductVideoLike } from './entity/Product_Video_Like'
// import { ProductVideoComment } from './entity/Product_Video_Comment'
import {Pegg} from './entity/Pegg'
import { PromotionalVideo } from './entity/PromotionalVideo'
import { PromotionalVideoComment } from './entity/PromotionalVideoComment'
import { PromotionalVideoLike } from './entity/PromotionalVideoLike'
import { UserActivities } from './entity/UserActivities'
import { Generated_Video_Tags } from './entity/Generated_video_tags'
import { Shop } from './entity/Shop'
import { ProductAttributes } from './entity/Product_Attributes'
import { Services } from './entity/Services'
import { ServicePackages } from './entity/Service_Packages'
import { ServiceActivities } from './entity/Service_Activities'
import { ServiceAvailability } from './entity/Service_Availability'
import { DevTeam } from './entity/DevTeam'
import {Dev_User} from './entity/Dev_User'
import { State } from './entity/State';
import { City } from './entity/Cities'
import { PubKey } from './entity/Pub_Key'
import { AccessToken } from './entity/Access_Token'
import { DevProduct } from './entity/Dev_Product'
import { Dev_Videos } from './entity/dev_videos'
import { DevProductPicture } from './entity/Dev_Product_Picture'
import { DevProductAttributes } from './entity/Dev_ProductAttribute'
import { PromotionalVideoProducts } from './entity/Dev_PromotionalVideoProduct'
import { Dev_Shop } from './entity/Dev_Shop'
import { ProductKey } from './entity/Product_Key'
import { KeyStore } from './entity/Key_Store'
import { Business } from './entity/Business'
import { Dev_Token } from './entity/Dev_Token'
// import { ServicePlansService } from '../../../services/servicePlans'

const env = process.env.NODE_ENV || 'development'
const dbData: any = config.database

const dbConfig = {
    type: 'mysql',
    synchronize: false,
    logging: true,
    entities: [
        Cart,
        User,
        Order,
        OrderItem,
        Token,
        Like,
        Brand,
        Pegg,
        Color,
        ProductComment,
        Interest,
        OtpVerify,
        Category,
        Product,
        SubCategory,
        ProductVideo,
        UserActivities,
        ProductPicture,
        ProductAttributes,
        ServicePackages,
        ServiceActivities,
        ServiceAvailability,
        Services,
        City,
        State,
        Shop,
        PromotionalVideo,
        PromotionalVideoLike,
        PromotionalVideoComment,
        Generated_Video_Tags, 
        Dev_User,
        PubKey,
        DevTeam,
        AccessToken,
        DevProduct,
        Dev_Videos,
        DevProductPicture,
        DevProductAttributes,
        Dev_Shop,
        PromotionalVideoProducts,
        ProductKey,
        KeyStore,
        Business,
        Dev_Token

    ],
    ...dbData[env],
}

export { dbConfig }
