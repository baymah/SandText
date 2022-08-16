import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { TokenType } from "../../../../modules/iam/domain/token";
import { DomainEvents } from "../../../../shared/core/events/DomainEvents";
import { Dev_User } from "./Dev_User";
import { User } from "./User";

@Entity("dev_tokens")
export class Dev_Token extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id!: string;

    @Column({
        type: "enum",
        enum: TokenType,
    })
    type: TokenType;

    @Column()
    expires_at: Date;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    // Relations
    // User
    @ManyToOne(() => Dev_User, (user) => user.tokens,{onDelete:'CASCADE'})
    @JoinColumn({ name: "user_id" })
    user?: User;

    // constructor(params: {
    //     id: string;
    //     name: string;
    //     type: TokenType;
    //     expires_at: Date;
    //     user_id: string;
    // }) {
    //     super();
    //     this.id = params.id;
    //     this.user_id = params.user_id;
    //     this.type = params.type;
    //     this.expires_at = params.expires_at;
    // }

    // Subscribers
    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    dispatchEvents() {
        DomainEvents.dispatchEventsHook(this.user_id);
    }
}
