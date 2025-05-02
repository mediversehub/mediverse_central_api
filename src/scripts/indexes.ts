import { getMongoDB } from "./mongo";
import logger from "../utils/logger";
import { indexConfigs } from "./configs";

async function createIndexes() {
  const { db, client } = await getMongoDB();

  try {
    for (const { collection_name, config } of indexConfigs) {
      logger.info(`Creating indexes for ${collection_name}`);

      await db.collection(collection_name).createIndexes(config);

      logger.info(`Indexes for ${collection_name} created successfully`);
    }
  } catch (err) {
    logger.error("Failed to create indexes:", err);
    throw err;
  } finally {
    await client.close();
  }
}

createIndexes();
