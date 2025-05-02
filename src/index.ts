import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import logger from './utils/logger';
import requestLogger from './middlewares/request_logger';
import helmet from './utils/helmet';
import rateLimiter from './utils/rate_limiter';
import errorHandler from './middlewares/error_handler';
import corsMiddleware from './utils/cors';
import connectMongo from './utils/mongo';

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(corsMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet);
  app.use(rateLimiter);
}

app.get('/', (_req, res) => {
  logger.info('Home route accessed');
  res.send('Hello, Mediverse!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
