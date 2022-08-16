import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Interest } from './Interest';
import { Order } from './Order';
import { Token } from './Token';
import { Like } from './Like';
import { ProductComment } from './Product_Comments';
import { Product } from './Product';
import { Cart } from './Cart';
// import { ProductVideoLike } from './Product_Video_Like';
import { ProductVideo } from './Product_Video';
// import { ProductVideoComment } from './Product_Video_Comment';
import { PromotionalVideo } from './PromotionalVideo';
import { PromotionalVideoLike } from './PromotionalVideoLike';
import { UserActivities } from './UserActivities';
import { Shop } from './Shop';
import { PromotionalVideoComment } from './PromotionalVideoComment';
import { Services } from './Services';

enum UserGender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Others',
}

enum Source {
    Default = 'Default',
    Admin = 'Admin',
}
enum DeviceType {
    Default = 'android',
    Admin = 'ios',
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    username!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    email!: string;

    @Column({ type: 'varchar', length: 191})
    phone!: string;

    @Column({ type: 'longtext', nullable:true })
    bio!: string;

    @Column({ type: 'longtext', nullable: true })
    address!: string;

    @Column({ type: 'varchar', length: 191 , nullable: true})
    picture!: string;

    @Column({
        type: 'enum',
        enum: UserGender,
        nullable:true
    })
    gender!: UserGender;

    @Column({ type: 'int', default: 0 })
    is_verified!: number;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true
    })
    latitude!: string;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true
    })
    longitude!: string;

    @Column({ type: 'varchar', length: 191 , nullable: true})
    device_id!: string;

    @Column({
        type: 'enum',
        enum: DeviceType,
    })
    @Column({ type: 'varchar', length: 191, nullable: true })
    device_type!: DeviceType;

    @Column({ type: 'varchar', length: 191, nullable: true })
    country_id!: string;

    @Column({ type: 'int' , nullable: true})
    country_code!: number;

    @Column({ type: 'int', default: 1 })
    account_type_id!: number;

    @Column({ type: 'varchar', length: 191 })
    password!: string;

    @Column({ type: 'timestamp',nullable:true })
    email_verified_at!: Date;

    @Column({ type: 'tinyint', default: 0 })
    is_active!: number;

    @Column({ type: 'tinyint', default: 0 })
    is_banned!: string;

    @Column({ type: 'tinyint', default: 0,  })
    is_deleted!: number;

    @Column({nullable:true})
    ban_start_date!: Date;

    @Column({ nullable: true })
    ban_end_date!: Date;

    @Column({
        type: 'enum',
        enum: Source,
        default: Source.Default,
    })
    source!: Source;

    @Column({nullable:true})
    dob!: Date;

    @Column({ type: 'varchar', length: 191, nullable: true })
    remember_token!: string;

    @Column({ type: 'datetime', nullable:true})
    date_deleted!: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    //Relations
    @OneToOne(() => Token, (token) => token.user)
    @JoinColumn()
    token?: Token;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn()
    order?: Order[];

    @OneToMany(() => Like, (like) => like.user,
        // { eager: true }
    )
    likes!: Like[];

    @OneToMany(() => Services, (service) => service.user,
        // { eager: true }
    )
    services!: Services[];

    // @OneToMany(() => ProductVideoLike, (like) => like.user, { eager: true })
    // product_video_likes!: ProductVideoLike[];

    @OneToMany(() => PromotionalVideoLike, (pv_like) => pv_like.user)
    promotionalVideoLikes!: PromotionalVideoLike[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts!: Cart[];

    @OneToMany(() => Product, (product) => product.user,
        // { eager: true }
    )
    products!: Product[];

    @OneToMany(() => ProductVideo, (productVideo) => productVideo.user,
        // { eager: true }
    )
    productVideo!: ProductVideo[];

    @OneToMany(() => PromotionalVideo, (promotionalVideo) => promotionalVideo.user)
    promotionalVideos?: PromotionalVideo[];

    @OneToMany(() => ProductComment, (pComment) => pComment.user,
        {
        // eager: true,
        }
    )
    product_comment!: ProductComment[];

    @OneToMany(() => PromotionalVideoComment, (pv_like) => pv_like.promo_video)
    promo_video_comment!: PromotionalVideoComment[];
    // @OneToMany(() => ProductVideoComment, (pVideoComment) => pVideoComment.user, {
    //     eager: true,
    // })
    // product_video_comment!: ProductVideoComment[];

    @OneToMany(() => UserActivities, (pVideoComment) => pVideoComment.user,
        {
        // eager: true,
    })
    user_activity!: UserActivities[];

    @OneToMany(() => Shop, (shop) => shop.category)
    shops?: Shop[];

    @ManyToMany(() => Interest, { cascade: true })
    @JoinTable({
        name: 'user_interests',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'interest_id',
            referencedColumnName: 'id',
        },
    })
    interests!: Interest[];
    // constructor(params: {
    //     id?: string;
    //     username: string;
    //     email: string;
    //     phone: string;
    //     bio: string;
    //     picture: string;
    //     gender: UserGender;
    //     latitude: string;
    //     longitude: string;
    //     device_id: string;
    //     device_type: DeviceType;
    //     country_id: string;
    //     country_code: number;
    //     account_type_id: number;
    //     password: string;
    //     email_verified_at: Date;
    //     is_active: number;
    //     is_banned: string;
    //     ban_start_date: Date;
    //     ban_end_date: Date;
    //     dob: Date;
    //     // token: Token;
    //     remember_token: string;
    //     interests: Interest[];
    // }) {
    //     super();
    //     this.id = params.id || uuid();
    //     // this.user_id = params.user_id || 'somevalues';
    //     this.username = params.username;
    //     this.email = params.email;
    //     this.phone = params.phone;
    //     this.picture = params.picture;
    //     this.bio = params.bio;
    //     this.gender = params.gender;
    //     this.latitude = params.latitude;
    //     this.longitude = params.longitude;
    //     this.device_id = params.device_id;
    //     this.device_type = params.device_type;
    //     this.country_id = params.country_id;
    //     this.country_code = params.country_code;
    //     this.account_type_id = params.account_type_id;
    //     this.password = params.password;
    //     this.email_verified_at = params.email_verified_at;
    //     this.is_active = params.is_active;
    //     this.is_banned = params.is_banned;
    //     this.ban_start_date = params.ban_start_date;
    //     this.ban_end_date = params.ban_end_date;
    //     this.dob = params.dob;
    //     this.remember_token = params.remember_token;
    //     this.interests = params.interests;
    // }
}
