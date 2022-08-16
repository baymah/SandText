import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    // RelationId,
    //     RelationId,
} from 'typeorm';
import { Product } from './Product';

@Entity('product_pictures')
export class ProductPicture extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    picture!: string;

    @Column({ type: 'varchar', length: 191 })
    thumbnail!: string;

    @Column({ type: 'int', default: 0 })
    status!: number;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    @Column({ type: 'varchar' })
    product_id!: string;
    @ManyToOne(() => Product, (product) => product.product_picture, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'product_id',
    })
    product!: Product;
}
