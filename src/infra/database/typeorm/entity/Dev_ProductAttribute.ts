import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('dev_product_attributes')
export class DevProductAttributes extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @Column({ type: 'varchar', length: 191 })
    color!: string;

    @Column({ type: 'varchar', length: 191 })
    size!: string;

    @Column({ type: 'varchar', length: 191 })
    weight!: string;
    
    @Column({ type: 'tinyint', default: 1})
    availability!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column({ type: 'tinyint', default: 0 })
    is_deleted!: number;

    @Column({type:'int'})
    quantity!:number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
