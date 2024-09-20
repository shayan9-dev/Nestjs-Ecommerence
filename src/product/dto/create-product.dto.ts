import { ApiProperty } from "@nestjs/swagger"
import { IsString, minLength } from "class-validator"

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsString()
    des:string

    @ApiProperty()
    @IsString()
    price:number
}
