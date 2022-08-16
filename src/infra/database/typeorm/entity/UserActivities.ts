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
import { User } from './User';

@Entity('user_activities')
export class UserActivities extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.user_activity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ type: 'varchar', length: 191 })
    platform!: string;

    @Column({ type: 'varchar', length: 191 })
    activity!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({
        type: 'enum',
        enum: ['web', 'mobile'],
        nullable: true,
    })
    type!: string;

    @Column({ type: 'varchar', length: 191 })
    city!: string;

    @Column({ type: 'varchar', length: 191 })
    region!: string;

    @Column({ type: 'varchar', length: 191 })
    country!: string;

    @Column({ type: 'varchar', length: 191 })
    latitude!: string;

    @Column({ type: 'varchar', length: 191 })
    longitude!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
