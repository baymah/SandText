import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name:'local_governments',synchronize: false})
export class City {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    state_id!: number;

    @Column()
    name!: string;
}
