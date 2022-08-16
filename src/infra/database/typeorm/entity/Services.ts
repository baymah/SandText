import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ServiceActivities } from './Service_Activities';
import { ServiceAvailability } from './Service_Availability';
import { ServicePackages } from './Service_Packages';
import { User } from './User';

@Entity('services')
export class Services extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.services)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'simple-array' })
    pictures!: string[];

    @Column({ type: 'varchar', length: 191 })
    category_id!: string;

    @Column({ type: 'integer', default: 0 })
    status!: number;

    @Column({ type: 'varchar', length: 191 })
    company_name!: string;

    @Column({ type: 'varchar', length: 191 })
    phone!: string;

    @Column({ type: 'varchar', length: 191 })
    email!: string;

    @Column({ type: 'varchar', length: 191 })
    address!: string;

    @Column({ type: 'varchar', length: 191 })
    currency!: string;

    @Column({ type: 'longtext' })
    description!: string;

    @Column({ type: 'longtext'})
    benefits!: string;

    @Column({ type: 'tinyint' , default: 0})
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @OneToMany(() => ServiceActivities, (serviceActivities) => serviceActivities.services)
    serviceActivities!: ServiceActivities[];

    @OneToMany(() => ServiceAvailability, (serviceAvailabilities) => serviceAvailabilities.services)
    serviceAvailabilities!: ServiceAvailability[];

    @OneToMany(() => ServicePackages, (servicePackages) => servicePackages.services)
    servicePackages!: ServicePackages[];

    // constructor(params: {
    //     id: string
    //     user_id: string
    //     name: string
    //     pictures: string[]
    //     category_id: string
    //     status: number
    //     company_name: string
    //     phone: string
    //     email: string
    //     address: string
    //     description: string
    //     currency: string
    //     benefits: string
    //     is_deleted: number
    //     updated_at: Date
    //     created_at: Date
    // }){
    //     super()
    //     this.id = params.id
    //     this.user_id = params.user_id
    //     this.name = params.name
    //     this.pictures = params.pictures
    //     this.category_id = params.category_id
    //     this.status = params.status
    //     this.company_name = params.company_name
    //     this.phone = params.phone
    //     this.email = params.email
    //     this.address = params.address
    //     this.description = params.description
    //     this.currency = params.currency
    //     this.benefits = params.benefits
    //     this.is_deleted = params.is_deleted
    //     this.updated_at = params.updated_at
    //     this.created_at = params.created_at
    // }

}