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
    this.logLevel = Number(process.env.LOG_LEVEL);
  }

  async logCommonMessage(message: string, level: string) {
    const dateTime = new Date().toLocaleString('en-US');
    message = `${dateTime} ${level} ${message} \n`;
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
    message = `${dateTime} ERROR ${message} \n`;
    process.stdout.write(message);
    try {
      await this.logErrorService.write(message);
    } catch (err) {
      console.log(err.message);
    }
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (this.levels.warn > this.logLevel) return;
    await this.logCommonMessage(message, 'WARN');
  }

  async log(message: any, ...optionalParams: any[]) {
    if (this.levels.log > this.logLevel) return;
    await this.logCommonMessage(message, 'LOG');
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (this.levels.verbose > this.logLevel) return;
    await this.logCommonMessage(message, 'VERBOSE');
  }
  async debug(message: any, ...optionalParams: any[]) {
    if (this.levels.debug > this.logLevel) return;
    await this.logCommonMessage(message, 'DEBUG');
  }

  setLogLevel(level: number) {
    this.logLevel = level;
  }

  getLogLevel() {
    return this.logLevel;
  }
}
