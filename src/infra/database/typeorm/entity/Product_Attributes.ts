import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
// import { Color } from './Color';
import { Product } from './Product';


@Entity('product_attributes')
export class ProductAttributes extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @ManyToOne(() => Product, (product) => product.product_attributes, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'product_id',
    })
    product?: Product;
                            
    // @Column({ type: 'varchar', length: 191 })
    // color_id!: string;

    // @ManyToOne(() => Color, (color) => color.product_attributes, { onDelete: 'CASCADE' })
    // @JoinColumn({
    //     name: 'color_id',
    // })
    // color?: Color;


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

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
