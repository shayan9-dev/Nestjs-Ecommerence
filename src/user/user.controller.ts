import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('User - Controller')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authservice:AuthService) {}

  @Post()
 async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user:User = await this.userService.create(createUserDto);
    const payload = {
      name:user.name,
      email:user.email,
      username:user.username,
      role:user.role,
      id:user.id
    }

    const token = await this.authservice.generatetoken(payload);
    return token;
  }

  @ApiBearerAuth('jwt auth')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    console.log(req.user.role);
    if(req.user.role == 'admin'){
      return this.userService.findAll();
    }
    else{
      throw new UnauthorizedException('Only admin can access this portal')
    }
   
  }

  @ApiBearerAuth('jwt auth')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('jwt auth')
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth('jwt auth')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
