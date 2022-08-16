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

@Entity('service_packages')
export class ServicePackages extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 , nullable: false})
    service_id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8,
        nullable: false,
        transformer: {
          to(value) {
            return value;
          },
          from(value) {
            return parseFloat(value);
          },
        },
      })
      price!: number;

    @Column({ type: 'longtext'})
    description!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @ManyToOne(() => Services, (services) => services.servicePackages)
    @JoinColumn({ name: 'service_id' })
    services!: Services;

    // constructor(params: {
    //     id: string
    //     service_id: string
    //     name: string
    //     price: number
    //     description: string
    //     is_deleted: number
    //     updated_at: Date
    //     created_at: Date
    // }){
    //     super()
    //     this.id = params.id
    //     this.service_id = params.service_id
    //     this.name = params.name
    //     this.price = params.price
    //     this.description = params.description
    //     this.is_deleted = params.is_deleted
    //     this.updated_at = params.updated_at
    //     this.created_at = params.created_at
    // }
}