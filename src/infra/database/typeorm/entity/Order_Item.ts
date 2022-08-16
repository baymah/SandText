import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    RelationId,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity('order_items')
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne((_type) => Order, (order) => order.orderItem, { onDelete:'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order?: Order;

    @RelationId((orderItem: OrderItem) => orderItem.order)
    @Column({ type: 'varchar', length: 191 })
    order_id!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @ManyToOne(() => Product, { eager: true,onDelete:'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ type: 'int', default: 0 })
    quantity!: number;

    @Column({ type: 'varchar', length: 191 })
    reference!: string;

    @Column({ type: 'varchar', length: 191 })
    size!: string;

    @Column({ type: 'varchar', length: 191 })
    colour_id!: string;

    @Column({ type: 'tinyint'})
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: { order_id: string; product_id: string; quantity: number; size: string; colour_id: string }) {
    //     super();
    //     this.order_id = params.order_id;
    //     this.quantity = params.quantity;
    //     this.size = params.size;
    //     this.colour_id = params.colour_id;
    // }
}
