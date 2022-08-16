import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Pegg } from './Pegg';
import { Product } from './Product';
import { User } from './User';

@Entity('product_videos')
export class ProductVideo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.productVideo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'varchar', length: 191 })
    title!: string;

    @Column({ type: 'varchar', length: 191 })
    description!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @OneToOne(() => Product, (product) => product.product_video, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'product_id',
    })
    product?: Product;

    @Column({ type: 'longtext' })
    video!: string;

    @Column({ type: 'varchar', length: 191 })
    thumbnail!: string;

    @Column({ type: 'varchar', length: 191 })
    json!: string;

    @Column({ type: 'varchar', length: 191 })
    mp4_url!: string;

    @Column({ nullable: true })
    video_aspect_ratio!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @OneToMany(() => Pegg, (peggs) => peggs.video)
    peggs!: Pegg[];

    // constructor(params: {
    //     id: string;
    //     title: string;
    //     json: string;
    //     description: string;
    //     product: any;
    //     video: string;
    //     thumbnail: string;
    //     user_id: string;
    //     user: User;
    //     mp4_url: string;
    //     created_at: Date;
    //     updated_at: Date;
    //     video_aspect_ratio: string;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.title = params.title;
    //     this.description = params.description;
    //     this.product = params.product;
    //     this.json = params.json;
    //     this.user_id = params.user_id;
    //     this.user = params.user;
    //     this.video = params.video;
    //     this.thumbnail = params.thumbnail;
    //     this.mp4_url = params.mp4_url;
    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    //     this.video_aspect_ratio = params.video_aspect_ratio;
    // }
}
