import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import logger from '../src/utils/logger';

const MONGO_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.DB_NAME || '';

if (!MONGO_URI || !DB_NAME) {
  throw new Error('MONGO_URI or DB_NAME environment variable is missing');
}

let client: MongoClient | null = null;

export async function getMongoDB() {
  try {
    client = new MongoClient(MONGO_URI);

    await client.connect();
    logger.info('Successfully connected to MongoDB');

    const db = client.db(DB_NAME);
    return { client, db };
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    if (client) {
      await client
        .close()
        .catch((err) =>
          logger.warn('Error closing client after failure:', err)
        );
    }
    throw new Error('MongoDB connection failed');
  }
}
