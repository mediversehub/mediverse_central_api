import mjml2html from 'mjml';
import path from 'path';
import fs from 'fs';
import { sendEmail } from '../middlewares/send_emails';

export const sendVerificationEmail = async (
  to: string,
  name: string,
  otp: string
) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    'verification.mjml'
  );
  const mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');
  const htmlOutput = mjml2html(
    mjmlTemplate.replace('{{name}}', name).replace('{{otp}}', otp)
  );

  await sendEmail(to, 'Verify your email', htmlOutput.html);
};
