import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logging/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {
    process.on('uncaughtExceptionMonitor', (err) => {
      this.loggingService.error(`Uncaught Exception ${String(err)}`);
    });
    process.on('unhandledRejection', (reason) => {
      this.loggingService.error(
        `Unhandled Promise Rejection with reason: ${reason}`,
      );
    });
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method, query, body } = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : String(exception);

    const logMessage = `${method} ${url} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)} ${status} ${message}`;
    this.loggingService.error(logMessage);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
