import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import './common/constants';
import * as fs from 'fs/promises';
import * as path from 'path';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';
import { LOG_DIR, PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // // read static yaml document
  // const document = yaml.load(
  //   await fs.readFile(join(process.cwd(), 'doc/api.yaml'), {
  //     encoding: 'utf-8',
  //   }),
  // );
  // SwaggerModule.setup('doc', app, document as OpenAPIObject);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  //create log directory if it doesnt exist, initialize logger and pass it to app
  const fullLogPath = path.resolve(process.cwd(), LOG_DIR);
  await fs.mkdir(fullLogPath, { recursive: true });
  const logger = app.get(LoggingService);
  await logger.initializeLogs();
  app.useLogger(logger);
  logger.log(`Logs are stored in ${fullLogPath}`);

  await app.listen(PORT, () => {
    logger.log(`Web server started on port: ${PORT}`);
  });
}

bootstrap();
