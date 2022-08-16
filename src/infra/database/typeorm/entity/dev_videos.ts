import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('dev_videos')
export class Dev_Videos extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @Column({ type: 'longtext' })
    description!: string;

    @Column({ type: 'varchar', length: 191 })
    mp4_link!: string;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

}