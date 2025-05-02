import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import logger from './utils/logger';
import requestLogger from './middlewares/request_logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);

app.get('/', (_req, res) => {
  logger.info('Home route accessed');
  res.send('Hello, Mediverse!');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
