import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { ResponseErrorInterceptor } from './middleware/interceptor/response-error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ 
      transform: true, 
      whitelist: true,
      validateCustomDecorators: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );
  
  app.useGlobalFilters(new ResponseErrorInterceptor());
  app.setGlobalPrefix('v1');
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
