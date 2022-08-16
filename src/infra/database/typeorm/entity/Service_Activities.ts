import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Services } from './Services';

@Entity('service_activities')
export class ServiceActivities extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 , nullable: false})
    service_type_id!: string;

    @Column({ type: 'varchar', length: 191 , nullable: false})
    service_id!: string;

    @ManyToOne(() => Services, (services) => services.serviceActivities)
    @JoinColumn({ name: 'service_id' })
    services!: Services;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: {
    //     id: string
    //     service_id: string
    //     service_type_id: string
    //     is_deleted: number
    //     updated_at:  Date
    //     created_at:  Date
    // }) {
    //     super()
    //     this.id = params.id
    //     this.service_id = params.id
    //     this.service_type_id = params.id
    //     this.is_deleted = params.is_deleted
    //     this.updated_at = params.updated_at
    //     this.created_at = params.created_at
    // }

}