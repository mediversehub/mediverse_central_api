export const redisConfig = {
  connection: process.env.REDIS_URI || "",
  maxRetriesPerRequest: null,
};
