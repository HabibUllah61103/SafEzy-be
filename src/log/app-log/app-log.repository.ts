import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLogEntity } from './app-log.entity';
import { LOG_CONNECTION } from 'src/database';

export class AppLogRepository extends Repository<AppLogEntity> {
  constructor(
    @InjectRepository(AppLogEntity, LOG_CONNECTION)
    AppLogEntity: Repository<AppLogEntity>,
  ) {
    super(AppLogEntity.target, AppLogEntity.manager, AppLogEntity.queryRunner);
  }
}
