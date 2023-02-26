import {
  ConsoleLogger,
  Injectable,
  Logger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { LogCommonService, LogErrorService } from './logfile.service';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;

  private levels: {
    error: number;
    warn: number;
    log: number;
    verbose: number;
    debug: number;
  };

  constructor(
    private readonly logCommonService: LogCommonService,
    private readonly logErrorService: LogErrorService,
  ) {
    this.levels = {
      error: 0,
      warn: 1,
      log: 2,
      verbose: 3,
      debug: 4,
    };
    // set default log level
    this.logLevel = this.levels.log;
  }

  async logCommonMessage(message: string, level: string) {
    const dateTime = new Date().toLocaleString('en-US');
    message = `${dateTime} [${level}] ${message} \n`;
    process.stdout.write(message);
    try {
      await this.logCommonService.write(message);
    } catch (err) {
      console.log(err.message);
    }
  }

  async error(message: any, ...optionalParams: any[]) {
    if (this.levels.error > this.logLevel) return;
    const dateTime = new Date().toLocaleString('en-US');
    message = `${dateTime} [error] ${message} \n`;
    process.stdout.write(message);
    try {
      await this.logErrorService.write(message);
    } catch (err) {
      console.log(err.message);
    }
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (this.levels.warn > this.logLevel) return;
    await this.logCommonMessage(message, 'warn');
  }

  async log(message: any, ...optionalParams: any[]) {
    if (this.levels.log > this.logLevel) return;
    await this.logCommonMessage(message, 'log');
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (this.levels.verbose > this.logLevel) return;
    await this.logCommonMessage(message, 'verbose');
  }
  async debug(message: any, ...optionalParams: any[]) {
    if (this.levels.debug > this.logLevel) return;
    await this.logCommonMessage(message, 'dubug');
  }

  setLogLevel(level: number) {
    this.logLevel = level;
  }

  getLogLevel() {
    return this.logLevel;
  }
}
