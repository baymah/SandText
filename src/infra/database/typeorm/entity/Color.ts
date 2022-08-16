import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Cart } from './Cart';
import { ProductAttributes } from './Product_Attributes';
// import { Product } from './Product'

@Entity('colors')
export class Color extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    code!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @OneToMany(() => Cart, (cart) => cart.color)
    cart!: Cart[];
    
    @OneToMany(() => ProductAttributes, (product_attributes) => product_attributes.color)
    product_attributes!: ProductAttributes[];

    // @ManyToOne(() => Product, (product) => product.color)

    // @JoinColumn({ name: 'product_id' })
    // product!: Product

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: { name: string; code: string }) {
    //     super();
    //     this.name = params.name;
    //     this.code = params.code;
    // }
}
