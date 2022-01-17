import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './config/filters/entity-not-found.exception-filter';
import { QueryFailedExceptionFilter } from './config/filters/query-failed-exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './config/api/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJs Api condominio')
    .setDescription('Documentação da aplicação condominio')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(app.get(AppConfigService).port);
}
bootstrap();
