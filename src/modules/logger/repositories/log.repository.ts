import { Log } from './../entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class LogRepository extends Repository<Log> {
  constructor(
    @InjectRepository(Log)
    log: Repository<Log>,
  ) {
    super(log.target, log.manager, log.queryRunner);
  }
}
