import { Module } from '@nestjs/common';
import { AppLogService } from './app-log/app-log.service';
import { AuditLogService } from './audit-log/audit-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogEntity } from './app-log/app-log.entity';
import { AuditLogEntity } from './audit-log/audit-log.entity';
import { CustomLogger } from './app-log/custom';
import { AppLogRepository } from './app-log/app-log.repository';
import { AuditLogRepository } from './audit-log/audit-log.repository';
import { LOG_CONNECTION } from 'src/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppLogEntity, AuditLogEntity], LOG_CONNECTION),
  ],
  providers: [
    AppLogService,
    AuditLogService,
    CustomLogger,
    AppLogRepository,
    AuditLogRepository,
  ],
})
export class LogModule {}
