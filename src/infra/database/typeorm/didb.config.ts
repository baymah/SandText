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
import { Wallet } from '../../../wallet/walletEntity'
import { Coupon } from '../../../coupon/couponEntity'
import { DevTeam } from './entity/DevTeam'
import { Country } from '../../../state/src/management/repository/CountryEntity'
import { State } from './entity/State';
import { City } from './entity/Cities'
import { Business } from './entity/Business'
import { Dev_Token } from './entity/Dev_Token'
// import { ServicePlansService } from '../../../services/servicePlans'

const env = process.env.NODE_ENV || 'development'
const dbData: any = config.newDatabaseConnection

const dbConfig = {
    type: 'mysql',
    synchronize: false,
    logging: true,
    entities: [
        Cart,
        User,
        Order,
        Country,
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
        Wallet,
        Coupon,
        DevTeam,
        Business,
        Dev_Token

    ],
    ...dbData[env],
}

export { dbConfig }
