import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalInterceptors
    // new ExcludePasswordInterceptor(),
    // new ClassResponseInterceptor(),
    // new StudentInterceptor(),
    ();

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
