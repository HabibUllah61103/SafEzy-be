import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwagger } from './config/swagger.config';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomLogger } from './log/app-log/custom';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();

  app.use(helmet());

  useSwagger(app);

  app.useLogger(app.get(CustomLogger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const logger = new Logger('Main');

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => logger.log(`Server listening on port ${PORT}`));
}
bootstrap();
