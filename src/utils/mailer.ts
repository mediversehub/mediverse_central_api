import nodemailer from 'nodemailer';
import { mailerConfig } from '../configs/mailer.config';
import logger from './logger';

const transporter = nodemailer.createTransport(mailerConfig);

transporter.verify((error, success) => {
  if (error) {
    logger.error('Mailer failed to connect:', error);
  } else {
    logger.info('Mailer is ready to send emails');
  }
});

export default transporter;
