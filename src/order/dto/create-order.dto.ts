import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"



export class CreateOrderDto {

    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNumber()
    price:number


}
