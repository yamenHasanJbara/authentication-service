import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserGender } from "../enum/user-gender.enum";

export class RegisterUserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    full_name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsEnum(UserGender)
    gender: UserGender;

    @IsNotEmpty()
    @IsEmail()
    @MinLength(8)
    @MaxLength(255)
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/u, { message: 'Password must contain at least one special character (@$!%*?&)'}) 
    password: string;
}