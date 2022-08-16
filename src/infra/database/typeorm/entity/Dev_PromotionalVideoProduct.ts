import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('dev_promotionalvideo_products')
export class PromotionalVideoProducts extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @Column({ type: 'varchar', length: 191 })
    promotional_video_id!: string;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
