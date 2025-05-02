import pino from 'pino';
import loggerConfig from '../configs/logger.config';

const logger = pino(loggerConfig);

export default logger;
