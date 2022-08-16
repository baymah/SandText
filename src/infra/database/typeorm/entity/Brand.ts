import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    // OneToMany,
    // JoinColumn,
    // JoinColumn,
    // OneToMany,
} from 'typeorm';
// import { Product } from './Product';

@Entity('brands')
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191,nullable:false })
    name!: string;

    @Column({ type: 'varchar', length: 191, nullable:true })
    slug!: string;

    @Column({ type: 'varchar', length: 191, nullable:true })
    image!: string;    

    @Column({ default: 0, type: 'int' })
    status!: number;

    @Column({ type: 'tinyint' })
    is_deleted!: Number;

    // @Column({
    //     type: 'varchar',
    //     length: 191,
    // })
    // product_id!: string;

    // @OneToMany(() => Product, (product) => product.brand)
    // @JoinColumn({ name: 'product_id' })
    // product!: Product[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: { id: string; name: string; slug: string; product: Product[] }) {
    // //     super();
    // //     this.id;
    // //     this.name = params.name;
    // //     this.slug = params.slug;
    // //     // this.product = params.product;
    // // }
}
