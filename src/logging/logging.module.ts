import { Module } from '@nestjs/common';
import { LogCommonService, LogErrorService } from './logfile.service';
import { LoggingService } from './logging.service';

@Module({
  providers: [LoggingService, LogCommonService, LogErrorService],
  exports: [LoggingService],
})
export class LoggingModule {}
