import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    RelationId,
    OneToMany,
} from 'typeorm';
import { OrderItem } from './Order_Item';
import { User } from './User';

export enum PaymentType {
    HomeDelivery = 'home_delivery',
    PickUp = 'pick_up',
    Card = 'card',
}
export enum PaymentStatus {
    Pending = 'pending',
    Unpaid = 'unpaid',
    Paid = 'paid',
}

// const PaymentStatus = ['pending', 'unpaid', 'paid'];
//  type PaymentStatus = typeof PaymentStatus[number];
@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    //Relation...
    @ManyToOne((_type) => User, (user) => user.order, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @RelationId((order: Order) => order.user)
    @Column()
    user_id!: string;

    @Column({ type: 'varchar', length: 191 })
    reference!: string;

    @Column({ type: 'varchar', length: 191, nullable: false })
    orderid!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
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
    amount!: number;

    // @Column({ type: 'varchar', length: 191 })
    // name!: string;

    @Column({ type: 'longtext' })
    note!: string;

    @Column({ type: 'longtext' })
    address!: string;

    @Column({
        type: 'enum',
        enum: PaymentType,
    })
    @Column({ type: 'varchar', length: 191 })
    payment_type!: PaymentType;

    // @Column({ type: 'varchar', length: 191 })
    // phone!: string;

    // @Column({ type: 'varchar', length: 191 })
    // email!: string;

    @Column({ type: 'varchar', length: 191 })
    tracking_id!: string;

    @Column({ default: 0, type: 'int' })
    delivery_status!: number;

    @Column({ default: 1, type: 'int' })
    payment_status!: number;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default:PaymentStatus.Pending
    })
    status!: PaymentStatus;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true })
    orderItem?: OrderItem[];

    // constructor(params: {
    //     user_id: string;
     //     reference: string;
  //     amount: number;
    //     note: string;
    //     address: string;
    //     payment_type: PaymentType;
    //tracking_id
    //delivery_status
    //     payment_status: number;


    //     name: string;

    //     phone: string;
    //     email: string;

    //     status: PaymentStatus;

   
  
    // }) {
    //     super();
    //     this.name = params.name;
    //     this.note = params.note;
    //     this.phone = params.phone;
    //     this.email = params.email;
    //     this.address = params.address;
    //     this.user_id = params.user_id;
    //     this.payment_type = params.payment_type;
    //     this.status = params.status;
    //     this.payment_status = params.payment_status;
    //     this.reference = params.reference;
    //     this.amount = params.amount;
    // }
}
