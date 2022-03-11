import { ApiHideProperty } from '@nestjs/swagger';
import {Event} from "../../events/entities/event.entity";
import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(type => Event, event => event.user, {eager:true, cascade: true})
    consents: Event[];

}