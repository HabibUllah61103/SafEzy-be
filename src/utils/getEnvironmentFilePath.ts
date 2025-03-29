export function getEnvironmentFilePath() {
  return `.env.${process.env.NODE_ENV || 'development'}`;
}
