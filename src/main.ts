import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('E-Commerence')
    .setDescription('this is a  Ecommerence Api')
    .setVersion('1.0')
    .addTag('E-C')
    .addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      name:'JWT',
      description:'Enter auth key',
      in:'header'
    },'jwt auth')
    .build()

    const documnet = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api',app,documnet)


  await app.listen(3000);
}
bootstrap();
