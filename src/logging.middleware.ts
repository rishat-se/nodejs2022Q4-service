import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: any, res: any, next: () => void) {
    res.on('finish', async () => {
      await this.loggingService.log(
        `${req.method} ${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(
          req.body,
        )} ${res.statusCode} ${res.body}`,
      );
      await this.loggingService.error(
        `${req.method} ${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(
          req.body,
        )} ${res.statusCode} ${res.body}`,
      );
    });
    next();
  }
}
