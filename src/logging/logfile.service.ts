import { Injectable, Scope } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs/promises';
import {
  CWD,
  LOGFILE_MAX_SIZE,
  LOG_COMMON_FILENAME,
  LOG_DIR,
  LOG_ERROR_FILENAME,
} from 'src/common/constants';

class LogfileService {
  logFile: string;
  logFileSize: number;
  logFileIndex: number;
  logFileTemplate: string;

  async write(message: string) {
    this.rotateLog(message.length);
    this.logFileSize += message.length;
    await fs.writeFile(this.logFile, message, {
      flag: 'a',
      encoding: 'utf8',
    });
  }

  async initialize() {
    const logDir = path.dirname(this.logFileTemplate);
    const logBaseName = path.basename(this.logFileTemplate);
    // read list of files in log dir
    const fileList = await fs.readdir(logDir);
    // find highest free log file index
    const curLogFileIndex = fileList
      .filter((file) => file.includes(logBaseName))
      .map((file) => +path.extname(file).substring(1))
      .filter((fileIndex) => typeof fileIndex === 'number')
      .reduce(
        (prevIndex, curIndex) => (curIndex > prevIndex ? curIndex : prevIndex),
        -1,
      );
    //set logfile name and size
    if (curLogFileIndex < 0) {
      this.logFile = `${this.logFileTemplate}.0`;
      this.logFileSize = 0;
      this.logFileIndex = 0;
    } else {
      this.logFileIndex = curLogFileIndex;
      this.logFile = `${this.logFileTemplate}.${this.logFileIndex}`;
      const logFileStat = await fs.stat(`${this.logFile}`);
      this.logFileSize = logFileStat.size;
    }
  }

  private rotateLog(messageSize: number) {
    if (this.logFileSize + messageSize > LOGFILE_MAX_SIZE) {
      this.logFileIndex++;
      this.logFile = `${this.logFileTemplate}.${this.logFileIndex}`;
      this.logFileSize = 0;
    }
  }
}

@Injectable()
export class LogCommonService extends LogfileService {
  constructor() {
    super();
    this.logFileTemplate = path.resolve(CWD, LOG_DIR, LOG_COMMON_FILENAME);
  }
}

@Injectable()
export class LogErrorService extends LogfileService {
  constructor() {
    super();
    this.logFileTemplate = path.resolve(CWD, LOG_DIR, LOG_ERROR_FILENAME);
  }
}
