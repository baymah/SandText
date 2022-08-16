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


@Entity('key_stores')
export class KeyStore extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    primary_key!: string;

    @Column({ type: 'varchar', length: 191 })
    secondary_key!: string;

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