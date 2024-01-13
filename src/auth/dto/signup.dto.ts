import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class signup{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    @MinLength(6)
    password: string;
}