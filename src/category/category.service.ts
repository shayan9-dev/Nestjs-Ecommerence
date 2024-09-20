import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
      constructor(@InjectRepository(Category) private readonly categoryRepository:Repository<Category>){

      }

  create(createCategoryDto: CreateCategoryDto) {
    let cate:Category = new Category();
    cate.title = createCategoryDto.title;
    cate.des = createCategoryDto.des;
    return this.categoryRepository.save(cate)
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({where:{id:id}});
  }


  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
