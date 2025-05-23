import dotenv from 'dotenv';
dotenv.config();

import { Worker, Job } from 'bullmq';
import connection from '../utils/redis';
import logger from '../utils/logger';
import { sendVerificationEmail } from '../tasks/send_verification_email';

const emailWorker = new Worker(
  'email-queue',
  async (job: Job) => {
    const { to, name, otp } = job.data;
    await sendVerificationEmail(to, name, otp);
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  logger.info(`Email job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  logger.error(`Email job ${job?.id} failed:`, err.message);
});
