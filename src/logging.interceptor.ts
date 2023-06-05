import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { url, method, query, body } = req;
    return next.handle().pipe(
      tap((resBody) => {
        const message = `${method} ${url} ${JSON.stringify(
          query,
        )} ${JSON.stringify(body)} ${res.statusCode} ${JSON.stringify(
          resBody,
          null,
          4,
        )}`;
        this.loggingService.log(message);
      }),
    );
  }
}
