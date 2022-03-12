import {Event} from "../../events/entities/event.entity";
import {ApiProperty} from "@nestjs/swagger";

export class ReturnUserDto {

    @ApiProperty({ example: 1, description: 'Auto Generated Id' })
    public readonly id: string;

    @ApiProperty({ example: 'example@example.com', description: 'User email' })
    public readonly email: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    public readonly firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    public readonly lastName: string;

    @ApiProperty({ description: 'Consents given by user' })
    public readonly consents: Event[];

    public constructor(opts?: Partial<ReturnUserDto>) {
        Object.assign(this, opts);
    }

}