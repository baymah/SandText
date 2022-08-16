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
import { Product } from './Product';
import { User } from './User';

@Entity('product_likes')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // @Column({ type: 'uuid' })
    // uuid!: string;
    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @ManyToOne(() => User, (user) => user.likes, { onDelete:'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user?: User;
    // @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'uuid' })
    // user?: User;

    @Column({type:'int',default:0})
    likes!: number;

    @Column({type:'int',default:0})
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @Column({ type: 'uuid', length: 191 })
    // @Column({ type: 'uuid' })
    product_id!: string;

    @ManyToOne(() => Product, (product) => product.likes, {
        onDelete:'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product?: Product;

    // constructor(params: {
    //     id: string;
    //     likes: number;
    //     user_id: string;
    //     user: User;
    //     created_at: Date;
    //     updated_at: Date;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.likes = params.likes;
    //     this.user = params.user;
    //     this.user_id = params.user_id;
    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    // }
}
