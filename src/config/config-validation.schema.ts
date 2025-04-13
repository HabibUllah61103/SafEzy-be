import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  // FRONTEND_URL_DEVELOPMENT: Joi.string().required(),
  // FRONTEND_URL_STAGING: Joi.string().required(),
  BYPASS_PASSWORD: Joi.string(),
  BYPASS_OTP: Joi.string(),

  POSTGRES_PRIMARY_HOST: Joi.string().required(),
  POSTGRES_PRIMARY_PORT: Joi.number().required(),
  POSTGRES_PRIMARY_USER: Joi.string().required(),
  POSTGRES_PRIMARY_PASSWORD: Joi.string().required(),
  POSTGRES_PRIMARY_DB: Joi.string().required(),

  POSTGRES_LOG_HOST: Joi.string().required(),
  POSTGRES_LOG_PORT: Joi.number().required(),
  POSTGRES_LOG_USER: Joi.string().required(),
  POSTGRES_LOG_PASSWORD: Joi.string().required(),
  POSTGRES_LOG_DB: Joi.string().required(),

  JWT_AUTH_SECRET_KEY: Joi.string().required(),
  JWT_AUTH_EXPIRES_IN: Joi.string().required(),

  JWT_REFRESH_SECRET_KEY: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
});
