import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('dev_products') // return to dev_products
export class DevProduct extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    // @Column({ type: 'varchar', length: 191 })
    // thumbnail!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

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

    @Column('longtext')
    description!: string;

    @Column({ type: 'varchar', length: 191 })
    brand!: string;

    @Column({ type: 'int', default: 0 })
    product_status!: number;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'int', default:0 })
    status!: number;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @Column({ type: 'varchar',length:191 })
    category_id!: string;

    @Column({ type: 'varchar',length:191 })
    subcategory_id!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
