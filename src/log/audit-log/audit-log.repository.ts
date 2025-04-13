import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity } from './audit-log.entity';
import { LOG_CONNECTION } from 'src/database';

export class AuditLogRepository extends Repository<AuditLogEntity> {
  constructor(
    @InjectRepository(AuditLogEntity, LOG_CONNECTION)
    AuditLogEntity: Repository<AuditLogEntity>,
  ) {
    super(
      AuditLogEntity.target,
      AuditLogEntity.manager,
      AuditLogEntity.queryRunner,
    );
  }
}
