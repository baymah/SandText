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
import { PromotionalVideo } from './PromotionalVideo';

@Entity('generated_video_tags')
export class Generated_Video_Tags extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    video_id!: string;

    @ManyToOne(() => PromotionalVideo, (promotional_video) => promotional_video.generatedTaggs,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'video_id' })
    promotional_video!: PromotionalVideo;

    @Column({ type: 'varchar', length: 191 })
    label!: string;

    // @Column()
    // price!: string;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8,
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
    price!: number;

    @Column({type:'varchar',length:191})
    product_id!: string;

    @ManyToOne(() => Product, (product) => product.generatedTaggs,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column()
    milliseconds!: number;

    @Column({ type: 'varchar', length: 191 })
    x!: string;

    @Column({ type: 'varchar', length: 191 })
    y!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: {
    //     id: string;
    //     video_id: string;
    //     label: string;
    //     milliseconds: number;
    //     x: string;
    //     y: string;
    //     promotional_video: PromotionalVideo;
    //     product: Product;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.video_id = params.video_id;
    //     this.label = params.label;
    //     this.milliseconds = params.milliseconds;
    //     this.x = params.x;
    //     this.y = params.y;
    //     this.promotional_video = params.promotional_video;
    //     this.product = params.product;
    // }
}
// @Column({ name: "R1ContentWidth", type: "decimal", precision: 2, scale: 2, nullable: true }) r1ContentWidth: number
