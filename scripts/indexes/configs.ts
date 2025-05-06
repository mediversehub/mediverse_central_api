import { IndexDescription } from 'mongodb';

interface CollectionIndexConfig {
  collection_name: string;
  config: IndexDescription[];
}

export const indexConfigs: CollectionIndexConfig[] = [
  {
    collection_name: 'Mediverse_Users',
    config: [
      {
        key: { username: 1 },
        name: 'username_unique_idx',
        unique: true,
      },
      {
        key: { email: 1 },
        name: 'email_unique_idx',
        unique: true,
      },
      {
        key: { contact: 1 },
        name: 'contact_unique_idx',
        unique: true,
      },
    ],
  },
  {
    collection_name: 'PendingUserRegistrations',
    config: [
      {
        key: { createdAt: 1 },
        expireAfterSeconds: 60 * 60 * 24,
      },
    ],
  },
];
