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
import { Color } from './Color';
import { Product } from './Product';
import { User } from './User';

@Entity('carts')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @Column({ type: 'varchar',length:191})
    product_id!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column({type:'int'})
    quantity!: number;

    @Column({ type: 'varchar', length: 191 })
    size!: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    weight!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({ type: 'varchar', length: 191 })
    color_id!: string; //change of the color_id type from number to string

    @ManyToOne(() => Color, (color) => color.cart, { eager: true, onDelete:'CASCADE'})
    @JoinColumn({ name: 'color_id' })
    color!: Color;

    //eagerloading product
    @ManyToOne(() => Product, (product) => product.carts, { eager: true,onDelete:'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @ManyToOne(() => User, (user) => user.carts, {
        onDelete:'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: {
    //     id: string;
    //     user_id: string;
    //     product_id: string;
    //     status: number;
    //     size: string;
    //     weight: string;
    //     quantity: number;
    //     color_id: string;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.user_id = params.user_id;
    //     this.product_id = params.product_id;
    //     this.status = params.status;
    //     this.size = params.size;
    //     this.color_id = params.color_id;
    //     this.weight = params.weight;
    //     this.quantity = params.quantity;
    // }
}
