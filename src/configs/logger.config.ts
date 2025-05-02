import { LoggerOptions } from 'pino';

const loggerConfig: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
};

export default loggerConfig;
