import { renderToStaticMarkup } from 'react-dom/server';
import * as React from 'react';
import OTPVerificationEmail from '../components/OTPVerificationEmail';
import WelcomeEmail from '../components/WelcomeEmail';

/**
 * Renders the OTP verification email template to an HTML string
 * @param otp The one-time password to include in the email
 * @param userName The name of the recipient
 * @returns HTML string of the rendered email
 */
export const renderOTPEmailTemplate = (
  otp: string,
  userName?: string,
): string => {
  return renderToStaticMarkup(
    React.createElement(OTPVerificationEmail, { otp, userName }),
  );
};

/**
 * Renders the welcome email template to an HTML string
 * @param userName The name of the recipient
 * @returns HTML string of the rendered email
 */
export const renderWelcomeEmailTemplate = (userName?: string): string => {
  return renderToStaticMarkup(React.createElement(WelcomeEmail, { userName }));
};
