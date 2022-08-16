// import {
//     Entity,
//     BaseEntity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
//     JoinColumn,
//     ManyToOne,
// } from 'typeorm';
// import { ProductVideo } from './Product_Video';
// import { User } from './User';

// @Entity('product_video_comments')
// export class ProductVideoComment extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id!: string;

//     @Column({ type: 'varchar' })
//     user_id!: string;

//     @Column({ type: 'varchar', length: 191 })
//     video_id!: string;

//     @Column({ type: 'longtext' })
//     comment!: string;

//     @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
//     created_at!: Date;

//     @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
//     updated_at!: Date;
//     //Relations
//     @ManyToOne(() => ProductVideo, (product_video) => product_video.product_video_comment, {
//         onDelete:'CASCADE',
//     })
//     @JoinColumn({ name: 'video_id' })
//     product_video?: ProductVideo;

//     @ManyToOne(() => User, (user) => user.product_video_comment, {
//         onDelete:'CASCADE',
//     })
//     @JoinColumn({ name: 'user_id' })
//     user?: User;
// }
