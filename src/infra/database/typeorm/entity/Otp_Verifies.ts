import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('otp_verifies')
export class OtpVerify extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191, unique: true, nullable: true })
    email!: string;

    @Column({ type: 'int' })
    otp!: number;

    @Column({type:'varchar',length:191})
    user_id!: string;

    @Column('bigint')
    expires_at!: number;


    @Column({type:'int',default:0})
    status!: number;


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: { id: string; email: string; otp: number; user_id: string; expires_at: number }) {
    //     super();
    //     this.id = params.id;
    //     this.email = params.email;
    //     this.otp = params.otp;
    //     this.user_id = params.user_id;
    //     this.expires_at = params.expires_at;
    // }
}
