import {IsEmail, MinLength, MaxLength} from "class-validator";

export class CreateUserDto {


    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    email: string;

    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @MinLength(2)
    @MaxLength(50)
    lastName: string;

}