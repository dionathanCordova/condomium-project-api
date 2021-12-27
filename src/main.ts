import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundExceptionFilter } from './config/filters/entity-not-found.exception-filter';
import { QueryFailedExceptionFilter } from './config/filters/query-failed-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
