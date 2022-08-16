import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity('shops')
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    company_name!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.shops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ type: 'varchar', length: 191 })
    phone!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    email!: string;

    @Column({ type: 'longtext' })
    address!: string;

    @Column({ type: 'int'})
    city_id!: number;

    @Column({ type: 'int'})
    state_id!: number;

    @Column({ type: 'varchar', length: 191 })
    delivery_status!: string;

    @Column({ type: 'varchar', length: 191,nullable:true})
    logistics!: string;

    @Column({ type: 'varchar', length: 191 })
    category_id!: string;

    @Column({ type: 'varchar', length: 191 })
    logo!: string;

    @Column({ type: 'varchar', length: 191 })
    logistic_id!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @ManyToOne(() => Category, (category) => category.shops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category?: Category;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
