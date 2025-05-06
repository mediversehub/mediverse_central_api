import { getMongoDB } from '../mongo';
import logger from '../../src/utils/logger';
import { indexConfigs } from './configs';

async function createIndexes() {
  const { db, client } = await getMongoDB();

  try {
    for (const { collection_name, config } of indexConfigs) {
      const collection = db.collection(collection_name);
      logger.info(`Creating indexes for ${collection_name}`);

      const existingIndexes = await collection.indexes();

      for (const newIndex of config) {
        const alreadyExists = existingIndexes.some((existingIndex) => {
          const sameKeys =
            JSON.stringify(existingIndex.key) === JSON.stringify(newIndex.key);
          const sameUnique =
            (existingIndex.unique || false) === (newIndex.unique || false);
          return sameKeys && sameUnique;
        });

        if (!alreadyExists) {
          await collection.createIndex(newIndex.key, newIndex);
          logger.info(
            `Index ${
              newIndex.name || JSON.stringify(newIndex.key)
            } created successfully`
          );
        } else {
          logger.info(
            `Index for ${JSON.stringify(newIndex.key)} already exists, skipping`
          );
        }
      }
    }
  } catch (err) {
    logger.error('Failed to create indexes:', err);
    throw err;
  } finally {
    await client.close();
  }
}

createIndexes();
