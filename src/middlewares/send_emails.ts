import logger from '../utils/logger';
import transporter from '../utils/mailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const sendTo =
      process.env.NODE_ENV === 'production' ? to : process.env.MAIL_USER;
    logger.info(`Sending email ${subject} to ${sendTo}`);
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: sendTo,
      subject,
      html,
    });
    logger.info(`Email ${subject} sent to ${sendTo}`);
  } catch (error) {
    logger.error(`Email ${subject} failed to send to ${to}:`, error);
  }
};
