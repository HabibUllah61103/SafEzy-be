export const configVariables = () => ({
  server: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    // frontendUrlDevelopment: process.env.FRONTEND_URL_DEVELOPMENT,
    // frontendUrlStaging: process.env.FRONTEND_URL_STAGING,
    bypassPassword: process.env.BYPASS_PASSWORD,
    bypassOTP: process.env.BYPASS_OTP,
  },
  db: {
    primary: {
      host: process.env.POSTGRES_PRIMARY_HOST,
      port: parseInt(process.env.POSTGRES_PRIMARY_PORT, 10),
      username: process.env.POSTGRES_PRIMARY_USER,
      password: process.env.POSTGRES_PRIMARY_PASSWORD,
      database: process.env.POSTGRES_PRIMARY_DB,
    },
    log: {
      host: process.env.POSTGRES_LOG_HOST,
      port: parseInt(process.env.POSTGRES_LOG_PORT, 10),
      username: process.env.POSTGRES_LOG_USER,
      password: process.env.POSTGRES_LOG_PASSWORD,
      database: process.env.POSTGRES_LOG_DB,
    },
  },
  jwt: {
    auth: {
      secretkey: process.env.JWT_AUTH_SECRET_KEY,
      expiresIn: process.env.JWT_AUTH_EXPIRES_IN,
    },
    refresh: {
      secretkey: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  },
  smtp: {
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  },
});
