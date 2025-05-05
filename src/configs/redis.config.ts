export const redisConfig = {
  connection: process.env.REDIS_URI || 'redis://localhost:6379',
  maxRetriesPerRequest: null,
};
