import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const CRYPT_SALT = +process.env.CRYPT_SALT || 10;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

export const LOGFILE_MAX_SIZE = (+process.env.LOGFILE_MAX_SIZE || 64) * 1000;
export const LOG_DIR = process.env.LOG_DIR || './logs';
export const LOG_COMMON_FILENAME = process.env.LOG_COMMON_FILENAME || 'app.log';
export const LOG_ERROR_FILENAME =
  process.env.LOG_ERROR_FILENAME || 'app-error.log';
export const LOG_LEVEL = +process.env.LOG_LEVEL || 2;

export const CWD = process.cwd();
