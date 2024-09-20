import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
      constructor(@InjectRepository(Product) private readonly productrepo:Repository<Product>){}



  create(createProductDto: CreateProductDto) {

    let product:Product = new Product()
    product.name = createProductDto.name;
    product.des = createProductDto.des;
    product.price = createProductDto.price;
  

    return this.productrepo.save(product);
  }

  findAll() {
    return this.productrepo.find();
  }

  findOne(id: string) {
    return this.productrepo.findOne({where:{id}});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product:Product = new Product()
    product.name = updateProductDto.name;
    product.des = updateProductDto.des;
    product.price = updateProductDto.price;
    product.id = id

    return this.productrepo.save(product);
  }

  remove(id: number) {
    return this.productrepo.delete(id);
  }
}
