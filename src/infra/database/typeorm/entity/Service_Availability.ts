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

@Entity('service_availability')
export class ServiceAvailability extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 , nullable: false})
    service_id!: string;

    @Column({ type: 'timestamp' })
    start_date!: Date;

    @Column({ type: 'timestamp' })
    end_date!: Date;

    @Column({ type: 'time' })
    start_time!: string;

    @Column({ type: 'time' })
    end_time!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @ManyToOne(() => Services, (services) => services.serviceAvailabilities)
    @JoinColumn({ name: 'service_id' })
    services!: Services;

    // constructor(params: {
    //     id: string
    //     service_id: string
    //     start_date: Date
    //     end_date: Date
    //     start_time: string
    //     end_time: string
    //     is_deleted: number
    //     updated_at: Date
    //     created_at: Date
    // }){
    //     super()
    //     this.id = params.id
    //     this.service_id = params.service_id
    //     this.start_date = params.start_date
    //     this.end_date = params.end_date
    //     this.start_time = params.start_time
    //     this.end_time = params.end_time
    //     this.is_deleted = params.is_deleted
    //     this.updated_at = params.updated_at
    //     this.created_at = params.created_at
    // }

}