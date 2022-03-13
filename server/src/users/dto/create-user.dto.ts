import {IsEmail, MinLength, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Event} from "../../events/entities/event.entity";

export class CreateUserDto {


    @ApiProperty({ example: 'test@test.com', description: 'User email' })
    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    email: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @ApiProperty({ example: '[{"id": "email_notifications","enabled": true},{"id": "sms_notifications","enabled": false}]', description: 'Consents given by user' })
    consents: Event[]

}