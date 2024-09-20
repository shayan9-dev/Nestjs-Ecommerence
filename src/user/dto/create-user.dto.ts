import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsPhoneNumber, IsString, MaxLength, maxLength, MinLength } from "class-validator"



export class CreateUserDto {

    @ApiProperty()
   @IsString()
    name:string

    @ApiProperty()
    @IsString()
    username:string

    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString()
    password:string



    
}

