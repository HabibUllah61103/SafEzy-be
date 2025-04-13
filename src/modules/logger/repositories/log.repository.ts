import { Log } from './../entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LOG_CONNECTION } from 'src/database';
import { Repository } from 'typeorm';

export class LogRepository extends Repository<Log> {
  constructor(
    @InjectRepository(Log, LOG_CONNECTION)
    log: Repository<Log>,
  ) {
    super(log.target, log.manager, log.queryRunner);
  }
}
