import { ApiHideProperty } from '@nestjs/swagger';
import {Event} from "../../events/entities/event.entity";
import {Column, Entity} from "typeorm";

@Entity()
export class User {
    @Column({nullable: false})
    id: string;
    @Column({nullable: false})
    email: string;
    // @ApiHideProperty()
    // password: string;
    // name?: string | null;
    consents: Array<Event>;
}