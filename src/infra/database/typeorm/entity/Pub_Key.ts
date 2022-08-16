import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Dev_User } from './Dev_User';


@Entity('dev_pub_keys')
export class PubKey extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    public_key!: string;

    @Column({ type: 'int', default:0 })
    status!: number;

    @Column({type:'varchar',length:191})
    user_id?:string

    @OneToOne(()=>Dev_User,(dev_user)=>dev_user.product_key)
    @JoinColumn({ name: 'user_id' })
    user!:Dev_User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;    
}