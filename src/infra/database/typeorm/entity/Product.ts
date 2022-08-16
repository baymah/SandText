import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
    ManyToMany,
} from 'typeorm';
import { ProductPicture } from './Product_Picture';
import { Like } from './Like';
import { ProductComment } from './Product_Comments';
// import { Brand } from './Brand';
import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { User } from './User';
// import { ProductVideo } from './Product_Video';
import { Pegg } from './Pegg';
import { Cart } from './Cart';
import { Generated_Video_Tags } from './Generated_video_tags';
import { ProductVideo } from './Product_Video';
import { ProductAttributes } from './Product_Attributes';
import { PromotionalVideo } from './PromotionalVideo';

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    @Column({ type: 'varchar', length: 191 })
    thumbnail!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    // @Column('double')
    // price!: number;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8,
        nullable: false,
        transformer: {
            to(value) {
                return value;
            },
            from(value) {
                return parseFloat(value);
            },
        },
    })
    price!: number;

    @Column('longtext')
    description!: string;

    @Column({ type: 'varchar', length: 191 })
    brand!: string;

    @Column({ type: 'int', default: 0 })
    product_status!: number;

    @Column({ type: 'int' })
    product_processed_status!: number;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'longtext' })
    product_processed_meta!: string;

    // @ManyToOne(() => Brand, (brand) => brand.product, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'brand_id' })
    // brand!: Brand;

    @Column({ type: 'varchar', length: 191 })
    color_id!: string;

    @Column({ type: 'varchar', length: 191 })
    shop_id!: string;

    @Column({ type: 'int', unique: true, nullable: true })
    status!: number;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @Column({ type: 'int', default: 0 })
    products_status!: number;

    @OneToMany(() => ProductPicture, (product_picture) => product_picture.product)
    product_picture!: ProductPicture[];

    @OneToMany(() => ProductAttributes, (product_attributes) => product_attributes.product)
    product_attributes!: ProductAttributes[];

    @OneToMany(() => Like, (like) => like.product, { eager: true })
    likes!: Like[];

    @OneToOne(() => ProductVideo, (product_video) => product_video.product)
    product_video!: ProductVideo;

    @OneToMany(() => Cart, (cart) => cart.product)
    carts!: Cart[];

    @OneToMany(() => Generated_Video_Tags, (generatedTaggs) => generatedTaggs.product)
    generatedTaggs!: Generated_Video_Tags[];

    @OneToMany(() => ProductComment, (pComment) => pComment.product, {
        eager: true,
    })
    product_comment!: ProductComment[];

    @ManyToMany(() => PromotionalVideo, (pVideo) => pVideo.products)
    promotionalVideo!: PromotionalVideo[];

    @Column({ type: 'varchar',length:191 })
    category_id!: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @Column({ type: 'varchar',length:191 })
    sub_categories_id!: string;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
    @JoinColumn({ name: 'sub_categories_id' })
    sub_categories!: SubCategory;

    @OneToMany(() => Pegg, (peggs) => peggs.product)
    peggs!: Pegg[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: {
    //     id: string;
    //     name: string;
    //     slug: string;
    //     video: string;
    //     picture: string;
    //     product_picture: ProductPicture[];
    //     brand_id: string;
    //     user_id: string;
    //     price: number;
    //     description: string;
    //     color_id: string;
    //     status: number;
    //     category: Category;
    //     subcategories: SubCategory;
    //     product_status: number;
    //     product_processed_meta: string;
    //     product_processed_status: number;
    // }) {
    //     super();
    //     this.name = params.name;
    //     this.slug = params.slug;
    //     this.category = params.category;
    //     this.sub_categories = params.subcategories;
    //     this.brand_id = params.brand_id; // this.video = params.video
    //     this.color_id = params.color_id;
    //     this.product_picture = params.product_picture;
    //     this.user_id = params.user_id;
    //     this.price = params.price;
    //     this.description = params.description;
    //     // this.size = params.size;
    //     this.status = params.status;
    //     this.product_status = params.product_status;
    //     this.product_processed_status = params.product_processed_status;
    //     this.product_processed_meta = params.product_processed_meta;
    // }
}
