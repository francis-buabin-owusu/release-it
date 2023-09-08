import nodemailer from 'nodemailer';
import { emailLogger } from '../logger.js';

export const sendEmail = (template: string, to: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    requireTLS: true,
    auth: {
      user: 'bdaaf5fcaf0314',
      pass: '8cebf2770eeb13',
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `ARMS <${process.env.USER_EMAIL}>`,
    to,
    subject,
    html: template,
  };

  try {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        // This error will only be needed by the developer
        emailLogger.info(
          `${mailOptions.subject} to ${mailOptions.to} Email sending failed `,
        );
      } else {
        return emailLogger.info(
          `${mailOptions.subject} Email sent to ${mailOptions.to} succssfully`,
        );
      }
    });
  } catch (error) {
    emailLogger.error(error);
  }
};
