import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips unknown properties
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Automatically transforms payloads to DTOs
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('School Management API')
    .setDescription('API documentation for the school management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
