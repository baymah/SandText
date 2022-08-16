import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('activity_types')
export class Activity_Types extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    @Column({ type: 'longtext' })
    description!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: Number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;

    // constructor(params: { id: string; name: string; slug: string; description: string }) {
    //     super();
    //     this.id;
    //     this.name = params.name;
    //     this.slug = params.slug;
    //     this.description = params.description;
    // }
}
