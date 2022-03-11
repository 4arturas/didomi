import { ApiHideProperty } from '@nestjs/swagger';
import {Event} from "../../events/entities/event.entity";
import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    email: string;

    // @ApiHideProperty()
    // password: string;
    // name?: string | null;

    @OneToMany(type => Event, event => event.user)
    consents: Event[];

    // @HasMany(() => Event)
    // photos: Event[];
}