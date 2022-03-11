import {IsBoolean, IsEnum, IsNotEmpty, IsString} from "class-validator";

export class CreateEventDto {

    @IsEnum(['email_notifications', 'sms_notifications'])
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    user: string;

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

}
