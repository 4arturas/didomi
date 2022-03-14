import {Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
@Unique("index_event_id_user", ["id", "user"])
@Check('id in (\'sms_notifications\',\'email_notifications\')')
export class Event {

    @PrimaryGeneratedColumn("uuid")
    entityId: string

    @Column({nullable:false})
    id: string

    @Column()
    enabled: boolean

    @ManyToOne(() => User, (User) => User.email )
    @JoinColumn({name: 'userId'})
    user: User;

}
