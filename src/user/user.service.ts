import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){

    }

 async create(createUserDto: CreateUserDto) {
    let user:User = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email  = createUserDto.email;
    user.role = 'Client'
    //hashing the password//
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password,salt);
    user.password = password;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({where:{id:id}});
  }

  findbyemail(email:string){
    return this.userRepository.findOne({where:{email:email}})
    }
  

  update(id: string, updateUserDto: UpdateUserDto) {
    let user:User = new User();
    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

