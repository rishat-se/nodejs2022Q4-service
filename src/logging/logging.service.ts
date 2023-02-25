import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(message + '\n');
  }
  error(message: any, ...optionalParams: any[]) {}
  warn(message: any, ...optionalParams: any[]) {}
  //   debug(message: any, ...optionalParams: any[]) {}
  //   verbose(message: any, ...optionalParams: any[]) {}
  //   setLogLevels(levels: LogLevel[]) {}
}
