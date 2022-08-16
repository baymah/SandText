import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name:'dev_teams',synchronize: false})
export class DevTeam {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type:'varchar',length:191})
    email!: string;

    @Column({type:'varchar',length:191})
    name!: string;

    @Column({type:'varchar',length:191})
    dev_key!: string;
}
