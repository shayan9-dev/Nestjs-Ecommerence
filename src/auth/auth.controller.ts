import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './login.dto';


@Controller('')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}
@Post('/login')
@UseGuards(AuthGuard('local'))
loginuser(@Req() req,@Body(ValidationPipe) logindto:LoginDto){
  let user:User = req.user;
  const payload ={
    name : user.name,
    username:user.username,
    email:user.email,
    role:user.role,
    id:user.id
  }
  return this.jwtService.sign(payload) ;
}

}
