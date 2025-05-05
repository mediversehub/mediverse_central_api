import { Queue } from 'bullmq';
import connection from '../utils/redis';

export const emailQueue = new Queue('email-queue', { connection });
