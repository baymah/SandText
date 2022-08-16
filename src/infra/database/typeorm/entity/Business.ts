import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Dev_User } from './Dev_User';

@Entity('businesses')
export class Business extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    user_id: string;

    @Column({ type: 'varchar', length: 191,nullable:false })
    business_name!: string;

    @Column({ type: 'varchar', length: 191, nullable:true })
    business_email!: string;

    @Column({ type: 'varchar', length: 191, nullable:true })
    position!: string;    

    @Column({ type: 'varchar', length: 191, nullable:true })
    location!: string;

    @Column({ type: 'tinyint',default:0 })
    is_deleted!: Number;

    @Column({ type: 'varchar', length: 191, nullable:true })
    videoRange!: string;

    @Column({ type: 'varchar', length: 191, nullable:true })
    uploadFrequency!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    //Relations
    @OneToOne((_type) => Dev_User, (user) => user.business,{onDelete:'CASCADE'})
    @JoinColumn({ name: "user_id" })
    user?: Dev_User;
     
}
