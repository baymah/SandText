import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany,
} from 'typeorm';
import { DomainEvents } from '../../../../shared/core/events/DomainEvents';
import { AccessToken } from './Access_Token';
import { Business } from './Business';
import { Dev_Token } from './Dev_Token';
import { ProductKey } from './Product_Key';
import { Token } from './Token';


@Entity('dev_users')
export class Dev_User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 191 })
    firstname!: string;

    @Column({ type: 'varchar', length: 191 })
    lastname!: string;

    @Column({ type: 'varchar', unique: true, length: 191 })
    email!: string;

    @Column({ type: 'tinyint', default: 0})
    email_verified!: number;

    @Column({type:'varchar',length:191})
    password!:string;

    // @Column({type:'varchar',unique:true, length:191})
    // company_name!:string;

    // @Column({type:'text'})
    // what_you_are_building!:string

   

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at!: Date;


    // Relations
    // AccessToken
    @OneToOne(()=>AccessToken,(access_token)=>access_token.user)
    access_token!:AccessToken;

    // ProductKey
    @OneToOne(()=>ProductKey,(pub_key)=>pub_key.user)
    product_key!:ProductKey;

    // Business
    @OneToOne(()=>Business,(business)=>business.user)
    business!:Business;

    // Token
    @OneToMany(() => Dev_Token, (token) => token.user)
    tokens?: Token[];

    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    dispatchEvents() {
        console.log("Trying to dispatch an event hook")
         setTimeout(() => {
             DomainEvents.dispatchEventsHook(this.id);
         }, 1000);
    }
}
