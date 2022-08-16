import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name:'states',synchronize: false})
export class State {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
}