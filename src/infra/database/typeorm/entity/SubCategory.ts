import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    RelationId,
    // ManyToMany,
    OneToMany,
} from 'typeorm';
import { Category } from './Category';
import { Product } from './Product';
// import { ProductVideo } from './Product_Video';
import { PromotionalVideo } from './PromotionalVideo';

@Entity('sub_categories')
export class SubCategory extends BaseEntity {
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

    @ManyToOne(() => Category, (category) => category.subcategory)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @RelationId((subcategory: SubCategory) => subcategory.category)
    @Column()
    category_id!: string;

    @OneToMany(() => Product, (product) => product.sub_categories)
    products?: Product[];

    @OneToMany(() => PromotionalVideo, (promotionalVideo) => promotionalVideo.subCategory)
    promotionalVideos?: PromotionalVideo[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: {
    //     id: string;
    //     name: string;
    //     slug: string;
    //     image: string;
    //     category_id: string;
    //     category: any;
    //     description: string;
    //     created_at: Date;
    //     updated_at: Date;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.name = params.name;
    //     this.slug = params.slug;
    //     this.image = params.image;
    //     this.description = params.description;
    //     this.category = params.category;
    //     this.category_id = params.category_id;
    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    // }
}
