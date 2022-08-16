import { injectable } from 'inversify';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { User } from './User';

@Entity('interests')
@injectable()
export class Interest extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ type: 'varchar', length: 191, unique: true })
    name!: string;

    @Column({ type: 'varchar', length: 191 })
    video!: string;

    @Column({ type: 'varchar', length: 191 })
    picture!: string;

    @Column({ type: 'varchar', length: 191 })
    slug!: string;

    @Column({ type: 'tinyint' })
    is_deleted!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at?: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at?: Date;

    @ManyToMany(() => User)
    users?: User[];

    // constructor(params: {
    //     id: string;
    //     name: string;
    //     video: string;
    //     picture: string;
    //     users: User[];
    //     created_at: Date;
    //     updated_at: Date;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.name = params.name;
    //     this.video = params.video;
    //     this.picture = params.picture;
    //     this.users = params.users;
    //     this.created_at = params.created_at;
    //     this.updated_at = params.updated_at;
    // }
}
