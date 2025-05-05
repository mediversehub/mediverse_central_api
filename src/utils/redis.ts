import IORedis from 'ioredis';
import { redisConfig } from '../configs/redis.config';

const connection = new IORedis(redisConfig);

export default connection;
