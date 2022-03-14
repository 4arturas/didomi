import {IsBoolean, IsEnum, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateEventDto {

    @ApiProperty({ example: '1', description: 'Event unique identifier' })
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @ApiProperty({ example: '\'email_notifications\', \'sms_notifications\'', description: 'Type of the consent' })
    @IsEnum(['email_notifications', 'sms_notifications'])
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 1, description: 'User unique identifier' })
    @IsString()
    @IsNotEmpty()
    user: string;

    @ApiProperty({ example: true, description: 'Consent is enabled or disabled' })
    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

}
