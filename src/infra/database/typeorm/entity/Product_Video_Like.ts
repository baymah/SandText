// import {
//     Entity,
//     BaseEntity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
//     JoinColumn,
//     ManyToOne,
// } from 'typeorm'
// import { ProductVideo } from './Product_Video'
// import { User } from './User'

// @Entity('product_video_likes')
// export class ProductVideoLike extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id!: string

//     @Column({ type: 'varchar',length:191 })
//     user_id!: string

//     @Column('int')
//     likes!: number

//     @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
//     created_at!: Date;

//     @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
//     updated_at!: Date;

//     @Column({ type: 'varchar',length:191 })
//     video_id!: string

//     //Relations
//     @ManyToOne(() => User, (user) => user.product_video_likes, { onDelete:'CASCADE' })
//     @JoinColumn({ name: 'user_id' })
//     user?: User

//     @ManyToOne(() => ProductVideo, (productVideo) => productVideo.likes, {
//         onDelete:'CASCADE',
//     })
//     @JoinColumn({ name: 'video_id' })
//     product_video?: ProductVideo
// }
