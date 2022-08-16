import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Dev_User } from './Dev_User';


@Entity('access_tokens')
export class AccessToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true, nullable:false, length: 191 })
    token!: string;

    @Column({ type: 'int', default:0 })
    status!: number;

    @Column({type:'varchar',nullable:false,length:191})
    user_id!:string;

    @OneToOne(()=>Dev_User,(dev_user)=>dev_user.access_token,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!:Dev_User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;    
}
