import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo:Repository<Order>,private userservice:UserService, private productService:ProductService){}

  async create(createOrderDto: CreateOrderDto, id: string ,proid:string) {
    let order:Order = new Order();
    order.name = createOrderDto.name;
    order.price= createOrderDto.price;
    order.orderdate = Date.now().toString();
    order.user = await this.userservice.findOne(id) ;
    order.product =await this.productService.findOne(proid)
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: string) {
    return this.orderRepo.findOne({ where: { id: id } });
  }

  findorderbyuserid(userid: string) {
    return this.orderRepo.findOne({relations:['user'],where:{user:{id:userid}}});
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
