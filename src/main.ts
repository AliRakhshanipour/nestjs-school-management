import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcludePasswordInterceptor } from './interceptors/user-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ExcludePasswordInterceptor());
  await app.listen(3000);
}
bootstrap();
