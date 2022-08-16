import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    // ManyToMany,
} from 'typeorm';
import { Product } from './Product';
// import { ProductVideo } from './Product_Video';
import { PromotionalVideo } from './PromotionalVideo';
import { Shop } from './Shop';
import { SubCategory } from './SubCategory';

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    @Column({ type: 'varchar', length: 191 })
    image!: string;

    @Column({ type: 'longtext' })
    description!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @OneToMany(() => Product, (product) => product.category)
    products?: Product;

    @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
    subcategory?: SubCategory[];

    @OneToMany(() => PromotionalVideo, (promotionalVideo) => promotionalVideo.subCategory)
    promotionalVideos?: PromotionalVideo[];

    @OneToMany(() => Shop, (shop) => shop.category)
    shops?: Shop[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
    // constructor(params: {
    //     id: string;
    //     name: string;
    //     slug: string;
    //     image: string;
    //     // video: ProductVideo[];
    //     description: string;
    //     created_at: Date;
    //     updated_at: Date;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.name = params.name;
    //     this.slug = params.slug;
    //     this.image = params.image;
    //     // this.video = params.video;
    //     this.description = params.description;
    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    // }
}
