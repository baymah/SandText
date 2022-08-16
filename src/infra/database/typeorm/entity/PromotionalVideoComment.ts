import {
    Entity,
    BaseEntity,
    // PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionalVideo } from './PromotionalVideo';
import { User } from './User';

// const crypto = require('crypto');
// const length = 22;

@Entity('promotional_comments')
export class PromotionalVideoComment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.promo_video_comment, { onDelete:'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ type: 'varchar', length: 191 })
    pro_vid_id!: string;

    @ManyToOne(() => PromotionalVideo, (promo_video) => promo_video.promo_video_comment, { onDelete:'CASCADE' })
    @JoinColumn({ name: 'pro_vid_id' })
    promo_video?: PromotionalVideo;

    @Column({ type: 'longtext' })
    comment!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;
    
    @Column({ type: 'int', default: 0 })
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // @BeforeInsert()
    // @BeforeUpdate()
    // async insertPrimaryKey(): Promise<void> {
    //     this.id = crypto
    //         .randomBytes(Math.ceil(length / 2))
    //         .toString('hex')
    //         .slice(0, length);
    // }
}
