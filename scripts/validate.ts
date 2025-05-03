import { getMongoDB } from './mongo';
import logger from '../src/utils/logger';

import { schemas as schemaConfigs } from './schemas';

interface SchemaDefinition {
  collection: string;
  validator: object;
}

const schemas: SchemaDefinition[] = schemaConfigs;

async function applyValidator(
  collectionName: string,
  validator: object,
  db: any
) {
  const existing = await db.listCollections({ name: collectionName }).toArray();

  if (existing.length > 0) {
    logger.info(`Updating validator for '${collectionName}'`);
    await db.command({
      collMod: collectionName,
      validator,
      validationLevel: 'strict',
    });
  } else {
    logger.info(`Creating collection '${collectionName}' with validator`);
    await db.createCollection(collectionName, {
      validator,
      validationLevel: 'strict',
    });
  }
}

export default async function runValidationMigration() {
  const { client, db } = await getMongoDB();

  try {
    for (const { collection, validator } of schemas as SchemaDefinition[]) {
      await applyValidator(collection, validator, db);
    }
    logger.info('Validation migration completed.');
  } catch (err) {
    logger.error('Validation migration failed:', err);
  } finally {
    await client.close();
  }
}

runValidationMigration().catch((err) => {
  logger.error('Unhandled migration error:', err);
  process.exit(1);
});
