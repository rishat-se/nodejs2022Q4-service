import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';

dotenv.config();
const PORT = process.env.PORT || 4000;
const LOG_DIR = process.env.LOG_DIR || '/logs';

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
  SwaggerModule.setup('doc', app, document as OpenAPIObject);

  //create log directory if it doesnt exist
  const fullLogPath = path.resolve(process.cwd(), LOG_DIR);
  await fs.mkdir(fullLogPath, { recursive: true });

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  logger.log(`Logs are stored in ${fullLogPath}`);

  await app.listen(PORT, () => {
    logger.log(`Web server started on port: ${PORT}`);
  });
}

bootstrap();
