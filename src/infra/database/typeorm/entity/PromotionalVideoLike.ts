import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { PromotionalVideo } from './PromotionalVideo';
// import { ProductVideo } from './Product_Video'
import { User } from './User';

@Entity('promotional_likes')
export class PromotionalVideoLike extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.promotionalVideoLikes,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ type: 'int', default: 0 })
    likes!: number;

    @Column({ type: 'varchar', length: 191 })
    prod_vid_id!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @ManyToOne(() => PromotionalVideo, (promotionalVideo) => promotionalVideo.promotional_likes,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'prod_vid_id' })
    promotional_video?: PromotionalVideo;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
