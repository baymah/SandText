import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';
import { ProductVideo } from './Product_Video';

@Entity('peggs')
export class Pegg extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'int' })
    duration!: number;

    @Column({ type: 'int' })
    frame_rate!: number;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    video_id!: string;

    @ManyToOne(() => ProductVideo, (productVideo) => productVideo.peggs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'video_id' })
    video!: ProductVideo;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    product_id!: string;

    @ManyToOne(() => Product, (product) => product.peggs, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: false,
    })
    label!: string;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: false,
    })
    confidence!: string;

    @Column({ type: 'varchar', length: 191 })
    boundingBoxHeight!: string;

    @Column({ type: 'varchar', length: 191 })
    boundingBoxWidth!: string;

    @Column({ type: 'varchar', length: 191 })
    boundingBoxTop!: string;

    @Column({ type: 'varchar', length: 191 })
    boundingBoxLeft!: string;

    @Column({ type: 'varchar', length: 191 })
    millisecond!: string;

    @Column({ type: 'varchar', length: 191 })
    centroid!: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;
}
