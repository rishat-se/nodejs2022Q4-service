import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging/logging.service';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {
    process.on('uncaughtException', (err) => {
      this.loggingService.error(`Uncaught Exception ${String(err)}`);
      process.exit(1);
    });
    process.on('unhandledRejection', (reason) => {
      this.loggingService.error(
        `Unhandled Promise Rejection with reason: ${reason}`,
      );
      process.exit(1);
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method, query, body } = ctx.getRequest<Request>();

    let excStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let excMessage = 'Internal Server Error';

    if (exception instanceof HttpException) {
      excStatus = exception.getStatus();

      const excResponse = exception.getResponse();
      if (typeof excResponse === 'object' && 'message' in excResponse) {
        excMessage = String((excResponse as HttpException).message);
      } else {
        excMessage = String(excResponse);
      }
    }

    const logMessage = `${method} ${url} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)} ${excStatus} ${JSON.stringify(excMessage)}`;
    this.loggingService.error(logMessage);

    response.status(excStatus).json({
      statusCode: excStatus,
      message: excMessage,
    });
  }
}
