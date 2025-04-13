import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogLevelEnum } from 'src/shared/enums';

import { AppLogEntity } from '../app-log.entity';
import { AppLogRepository } from '../app-log.repository';
import { AppLogParamsInterface } from '../interfaces/app-log-param.interface';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private appLogRepository: AppLogRepository) {
    super();
  }

  async writeLog({
    level,
    message,
    trace,
    userId,
    info,
    entity,
  }: AppLogParamsInterface): Promise<void> {
    const log = new AppLogEntity();

    log.level = level;
    log.message = message;
    log.trace = trace;
    log.userId = userId;
    log.info = info;
    log.entity = entity;

    await this.appLogRepository.insert(log);
  }

  log(
    message: string,
    trace?: string,
    info?: string,
    userId?: number,
    entity?: string,
  ) {
    super.log(message, trace);
    this.writeLog({
      level: LogLevelEnum.Info,
      message,
      trace,
      info,
      userId,
      entity,
    });
  }

  error(
    message: string,
    trace?: string,
    info?: string,
    userId?: number,
    entity?: string,
  ) {
    super.error(message, trace);
    this.writeLog({
      level: LogLevelEnum.Error,
      message,
      trace,
      info,
      userId,
      entity,
    });
  }

  warn(
    message: string,
    trace?: string,
    info?: string,
    userId?: number,
    entity?: string,
  ) {
    super.warn(message);
    this.writeLog({
      level: LogLevelEnum.Warn,
      message,
      trace,
      info,
      userId,
      entity,
    });
  }

  verbose(
    message: string,
    trace?: string,
    info?: string,
    userId?: number,
    entity?: string,
  ) {
    super.warn(message);
    this.writeLog({
      level: LogLevelEnum.Verbose,
      message,
      trace,
      info,
      userId,
      entity,
    });
  }
}
