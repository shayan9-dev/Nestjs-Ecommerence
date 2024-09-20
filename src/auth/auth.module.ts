import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategys/auth.local.stradegy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategys/auth.jwt.strategy';

@Module({
  imports:[forwardRef(()=> UserModule),JwtModule.registerAsync({
                imports:[ConfigModule],
                inject:[ConfigService],
                useFactory:(configservice:ConfigService)=>({
                  secret:configservice.get('JWT_KEY'),
                  signOptions:{
                    expiresIn:configservice.get<string>("JWT_EXP")+'s'
                  }
                })

  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
