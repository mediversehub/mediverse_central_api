import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import logger from './utils/logger';
import requestLogger from './middlewares/request_logger';
import helmet from './utils/helmet';
import rateLimiter from './utils/rate_limiter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet);
  app.use(rateLimiter);
}

app.get('/', (_req, res) => {
  logger.info('Home route accessed');
  res.send('Hello, Mediverse!');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
