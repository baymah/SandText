import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { Generated_Video_Tags } from './Generated_video_tags';
import { Product } from './Product';
import { PromotionalVideoComment } from './PromotionalVideoComment';
import { PromotionalVideoLike } from './PromotionalVideoLike';
import { SubCategory } from './SubCategory';
import { User } from './User';

@Entity('promotion_videos')
export class PromotionalVideo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id', type: 'varchar', length: 191 })
    user_id!: string;

    @Column({ name: 'product_id', type: 'varchar', length: 191 })
    product_id!: string;

    @Column({ name: 'title', type: 'varchar', length: 191 })
    title!: string;

    @Column({ name: 'video_link', type: 'varchar', length: 191 })
    video_link?: string;

    @Column({ name: 'mp4_link', type: 'varchar', length: 191 })
    mp4_url?: string;

    @Column({ type: 'longtext' })
    video!: string;

    @Column({ name: 'thumbnail', type: 'varchar', length: 191 })
    thumbnail!: string;

    @Column({ name: 'video_aspect_ratio', type: 'varchar', length: 191 })
    video_aspect_ratio!: string;

    @Column({ name: 'latitude', type: 'varchar', length: 191, nullable: true })
    latitude!: string;

    @Column({ name: 'longitude', type: 'varchar', length: 191, nullable: true })
    longitude!: string;

    @Column({ name: 'description', type: 'varchar', length: 191, nullable: true })
    description!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({ type: 'varchar', length: 191 })
    category_id?: string;

    @Column({ type: 'varchar', length: 191 })
    sub_category_id?: string;

    @ManyToOne(() => User, (user) => user.promotionalVideos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @ManyToMany(() => Product, (product) => product.promotionalVideo, { cascade: true })
    @JoinTable({
        name: 'promotional_video_products',
        joinColumn: {
            name: 'promotional_video_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
    })
    products!: Product[];

    @ManyToOne(() => Category, (category) => category.promotionalVideos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.promotionalVideos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sub_category_id' })
    subCategory!: SubCategory;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @OneToMany(() => PromotionalVideoLike, (pv_like) => pv_like.promotional_video)
    promotional_likes!: PromotionalVideoLike[];

    @OneToMany(() => PromotionalVideoComment, (pv_like) => pv_like.promo_video)
    promo_video_comment!: PromotionalVideoComment[];

    @OneToMany(() => Generated_Video_Tags, (generatedTaggs) => generatedTaggs.promotional_video)
    generatedTaggs!: Generated_Video_Tags[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
