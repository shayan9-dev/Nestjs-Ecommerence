import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('jwt auth')
@ApiTags('Order - Controller')
@Controller('/user/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':userid/:proid')
  create(@Body() createOrderDto: CreateOrderDto,@Param('userid') id:string,@Param('proid') proid:string) {
    return this.orderService.create(createOrderDto,id,proid);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/:userid')
  findorderbyuser(@Param('userid') userid: string) {
    return this.orderService.findorderbyuserid(userid);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
