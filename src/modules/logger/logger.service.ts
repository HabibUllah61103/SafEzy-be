import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { NodeEnv } from './enums/node-env.enum';
import { ConfigService } from '@nestjs/config';
import { LogRepository } from './repositories/log.repository';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly NODE_ENV: NodeEnv = this.configService.getOrThrow(
    'NODE_ENV',
    NodeEnv.DEVELOPMENT,
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly logRepository: LogRepository,
  ) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: string, trace: string = 'No trace provided') {
    this.logRepository.create({
      message,
      stack: trace,
      env: this.NODE_ENV,
    });
    this.logger.error(message, { trace });
  }

  saveErrorInDb(message: string, trace: string, context: string) {
    this.logRepository.create({
      message,
      context,
      stack: trace,
      env: this.NODE_ENV,
    });
    this.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
