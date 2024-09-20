import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true,envFilePath:['.local.env']}),
            TypeOrmModule.forRootAsync({
              imports:[ConfigModule],
              inject:[ConfigService],
              useFactory:(configService:ConfigService)=>({
                type:'postgres',
                host:configService.get('DATABASE_HOST'),
                port:configService.get('DATABASE_PORT'),
                username:configService.get('DATABASE_USERNAME'),
                password:configService.get('DATABASE_PASSWORD'),
                database:configService.get('DATABASE_NAME'),
                synchronize:configService.get('DATABASE_SYNC'),
                entities:[__dirname+'/**/*.entity{.ts,.js}']
              })
            }),
            UserModule,
            AuthModule,
            CategoryModule,
            ProductModule,
            OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
