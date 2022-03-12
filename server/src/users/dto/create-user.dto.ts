import {IsEmail, MinLength, MaxLength} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    email: string;

}