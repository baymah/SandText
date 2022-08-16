import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('dev_product_pictures')
export class DevProductPicture extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    picture!: string;

    @Column({ type: 'varchar', length: 191 })
    thumbnail!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column({ type: 'tinyint',default:0 })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @Column({ type: 'varchar' })
    product_id!: string;
}
