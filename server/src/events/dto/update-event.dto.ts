import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import {IsBoolean, IsEnum, IsNotEmpty, IsString} from "class-validator";

export class UpdateEventDto {
    @ApiProperty({ example: '1', description: 'Event unique identifier' })
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @ApiProperty({ example: true, description: 'Consent is enabled or disabled' })
    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;
}
