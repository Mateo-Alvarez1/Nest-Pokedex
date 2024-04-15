import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsePipes, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remueve todos los campos de mas (que no se encuentre en el DTO)
      forbidNonWhitelisted: true, // Retorna un Bad Request cuando vienen estas propiedades incorrectas
    }),
  );
  await app.listen(3000);
}
bootstrap();
