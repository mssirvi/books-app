import './instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './logger/filters/all-exceptions.filters';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: ['error', 'warn', 'debug', 'verbose', 'log']
    }
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(LoggerService)));

  const config = new DocumentBuilder()
    .setTitle('Books CRUD Apis')
    .setDescription('This is a sample crud app')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
