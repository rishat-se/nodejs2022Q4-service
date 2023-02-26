import { Injectable, Scope } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs/promises';

class LogfileService {
  logfile: string;

  async write(message: string) {
    const curLogFile = await this.rotateLog(message.length);
    await fs.writeFile(curLogFile, message, {
      flag: 'a',
      encoding: 'utf8',
    });
  }
  //
  private async rotateLog(messageSize: number) {
    const logDir = path.dirname(this.logfile);
    const logFilename = path.basename(this.logfile);
    // read list files in log dir
    const fileList = await fs.readdir(logDir);
    // if empty return initial logfilename
    if (fileList.length === 0) return `${this.logfile}.0`;
    //search highest logfile index
    let maxFileIndex = -1;
    for (const file of fileList) {
      if (file.includes(logFilename)) {
        const fileIndex = Number(path.extname(file).substring(1));
        if (typeof fileIndex === 'number') {
          maxFileIndex = fileIndex > maxFileIndex ? fileIndex : maxFileIndex;
        }
      }
    }
    // if not found return initial logfilename
    if (maxFileIndex < 0) return `${this.logfile}.0`;
    //create current logfile
    let curLogFile = `${this.logfile}.${maxFileIndex}`;
    //check current logfile size
    const stat = await fs.stat(curLogFile);
    if (stat.size + messageSize > Number(process.env.LOGFILE_MAX_SIZE) * 1000) {
      curLogFile = `${this.logfile}.${maxFileIndex + 1}`;
    }
    return curLogFile;
  }
}

@Injectable()
export class LogCommonService extends LogfileService {
  constructor() {
    super();
    this.logfile = path.resolve(
      process.cwd(),
      process.env.LOG_DIR,
      process.env.LOG_COMMON_FILENAME,
    );
  }
}

@Injectable()
export class LogErrorService extends LogfileService {
  constructor() {
    super();
    this.logfile = path.resolve(
      process.cwd(),
      process.env.LOG_DIR,
      process.env.LOG_ERROR_FILENAME,
    );
  }
}
