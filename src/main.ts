import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  // read static yaml document
  const document = yaml.load(
    await fs.readFile(join(process.cwd(), 'doc/api.yaml'), {
      encoding: 'utf-8',
    }),
  );
  SwaggerModule.setup('api', app, document as OpenAPIObject);
  app.useLogger(app.get(LoggingService));
  await app.listen(PORT);
}

bootstrap();
