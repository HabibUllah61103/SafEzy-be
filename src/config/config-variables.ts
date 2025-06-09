export const configVariables = () => ({
  server: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    webUrl: process.env.WEBAPP_URL,
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
    admin: {
      secretKey: process.env.JWT_SECRET_ADMIN,
      expiresIn: process.env.JWT_SECRET_ADMIN_EXPIRES_IN,
    },
  },
  smtp: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    name: process.env.SMTP_APP_NAME,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudApiKey: process.env.CLOUDINARY_API_KEY,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  admin: {
    name: process.env.DEFAULT_ADMIN_NAME,
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
});
