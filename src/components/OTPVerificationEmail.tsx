import React from 'react';

interface OTPVerificationEmailProps {
  otp: string;
  userName?: string;
}

const OTPVerificationEmail: React.FC<OTPVerificationEmailProps> = ({
  otp,
  userName = 'there',
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
      }}
    >
      <div
        style={{
          backgroundColor: '#1A365D',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://res.cloudinary.com/dtcu7xpaq/image/upload/v1744671479/without_bg_gpjdgh.png"
          alt="SafEzy Logo"
          style={{
            height: '60px',
            width: 'auto',
            marginRight: '15px',
          }}
        />
        <h1
          style={{
            color: 'white',
            margin: 0,
            padding: '10px 0',
            fontSize: '24px',
          }}
        >
          SafEzy Monitoring System
        </h1>
      </div>

      <div style={{ padding: '30px 20px', color: '#333333' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>Hello {userName},</p>

        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          Thank you for signing up on our vehicle monitoring system with person
          authentication. To verify your account, please use the following
          verification code:
        </p>

        <div
          style={{
            margin: '25px auto',
            width: '250px',
            padding: '15px',
            backgroundColor: '#f0f4f8',
            border: '2px dashed #1A365D',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              letterSpacing: '5px',
              color: '#1A365D',
            }}
          >
            {otp}
          </span>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          This code will expire in 5 minutes. If you did not request this
          verification code, please ignore this email or contact our support
          team if you believe this is a mistake.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.5', marginTop: '30px' }}>
          Regards,
          <br />
          The SafEzy Team
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#f0f4f8',
          padding: '15px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#666666',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <img
            src="https://res.cloudinary.com/dtcu7xpaq/image/upload/v1744671452/red_logo_berj9b.png"
            alt="SecureView Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </div>
        <p>© 2025 SafEzy. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  );
};

export default OTPVerificationEmail;
