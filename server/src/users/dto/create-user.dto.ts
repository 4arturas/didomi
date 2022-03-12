import {IsEmail, MinLength, MaxLength} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @MinLength(5)
    @MaxLength(15)
    email: string;

}