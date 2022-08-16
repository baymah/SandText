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

@Entity('product_comments')
export class ProductComment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    product_id!: string;

    @Column({ type: 'varchar', length: 191 })
    user_id!: string;

    @Column({ type: 'longtext' })
    comment!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @Column({ type: 'int',default:0 })
    status!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    //Relations

    @ManyToOne(() => User, (user) => user.product_comment, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'uuid' })
    user?: User;

    @ManyToOne(() => Product, (product) => product.product_comment, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product?: Product;

    // constructor(params: {
    //     id: string;
    //     comment: string;
    //     user_id: string;
    //     user: User;
    //     product: Product;
    //     product_id: string;
    //     created_at: Date;
    //     updated_at: Date;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.comment = params.comment;
    //     this.user_id = params.user_id;
    //     // this.user = params.user
    //     // this.product = params.product
    //     this.product_id = params.product_id;

    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    // }
}
