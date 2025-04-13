import { Module } from '@nestjs/common';
import { PrimaryDatabaseModule } from './primary-database/primary-database.module';
import { LogDatabaseModule } from './log-database/log-database.module';

@Module({
  imports: [PrimaryDatabaseModule, LogDatabaseModule],
})
export class DatabaseModule {}
