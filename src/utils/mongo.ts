import mongoose from 'mongoose';
import logger from './logger';
import { mongoConfig } from '../configs/mongo.config';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoConfig.uri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB error:', err);
  });
};

export default connectMongo;
