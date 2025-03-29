import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { LogRepository } from './repositories/log.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LoggerService, LogRepository],
  exports: [LoggerService],
})
export class LoggerModule {}
