import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const LOGFILE_MAX_SIZE = (+process.env.LOGFILE_MAX_SIZE || 64) * 1000;
export const LOG_DIR = process.env.LOG_DIR || './logs';
export const LOG_COMMON_FILENAME = process.env.LOG_COMMON_FILENAME || 'app.log';
export const LOG_ERROR_FILENAME =
  process.env.LOG_ERROR_FILENAME || 'app-error.log';

export const CWD = process.cwd();
