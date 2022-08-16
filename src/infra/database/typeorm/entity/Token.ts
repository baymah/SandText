import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import { User } from './User';

@Entity('tokens')
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    email!: string;

    @Column({ type: 'varchar', length: 191 })
    token!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column('bigint')
    expires_at!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // Relations
    @OneToOne((_type) => User, (user: User) => user.token)
    user?: User;

    // constructor(params: { id: string; email: string; token: string; user_id: string; expires_at: number }) {
    //     super();
    //     this.id = params.id;
    //     this.token = params.token;
    //     this.email = params.email;
    //     this.user_id = params.user_id;
    //     this.expires_at = params.expires_at;
    // }
}
