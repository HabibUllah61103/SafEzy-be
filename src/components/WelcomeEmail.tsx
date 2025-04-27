import React from 'react';

interface WelcomeEmailProps {
  userName?: string;
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName = 'there' }) => {
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
            borderRadius: '100%',
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
          Welcome to SafEzy Monitoring System
        </h1>
      </div>

      <div style={{ padding: '30px 20px', color: '#333333' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>Hello {userName},</p>

        <p style={{ fontSize: '16px', lineHeight: '1.5', fontWeight: 'bold' }}>
          Congratulations! Your account has been successfully verified. You're
          now ready to use our advanced car monitoring system with person
          authentication.
        </p>

        <div
          style={{
            margin: '25px 0',
            backgroundColor: '#f0f4f8',
            borderRadius: '6px',
            padding: '20px',
            border: '1px solid #1A365D',
          }}
        >
          <h2
            style={{
              color: '#1A365D',
              fontSize: '18px',
              marginTop: 0,
              borderBottom: '1px solid #1A365D',
              paddingBottom: '10px',
            }}
          >
            Getting Started Guide
          </h2>

          <ul
            style={{ paddingLeft: '20px', fontSize: '15px', lineHeight: '1.6' }}
          >
            <li>
              <strong>Monitor Your Vehicles</strong> - Set up monitoring zones
              and configure surveillance parameters.
            </li>
            <li>
              <strong>Person Authentication</strong> - Register trusted
              individuals and set up facial recognition.
            </li>
            <li>
              <strong>Configure Alerts</strong> - Customize notifications for
              unauthorized access or suspicious activities.
            </li>
            <li>
              <strong>Install Mobile App</strong> - Download our secure mobile
              app for real-time monitoring.
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href="#"
            style={{
              backgroundColor: '#1A365D',
              color: 'white',
              padding: '12px 25px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            Access Dashboard
          </a>
        </div>

        <p style={{ fontSize: '15px', lineHeight: '1.5' }}>
          If you have any questions or need assistance, please contact our
          support team at support@safezy.com.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.5', marginTop: '25px' }}>
          Best regards,
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
            style={{ height: '40px', width: 'auto', borderRadius: '100%' }}
          />
        </div>
        <p>© 2025 SafEzy. All rights reserved.</p>
        <p>
          <a
            href="#"
            style={{
              color: '#1A365D',
              textDecoration: 'none',
              margin: '0 10px',
            }}
          >
            Privacy Policy
          </a>{' '}
          |
          <a
            href="#"
            style={{
              color: '#1A365D',
              textDecoration: 'none',
              margin: '0 10px',
            }}
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};
export default WelcomeEmail;
