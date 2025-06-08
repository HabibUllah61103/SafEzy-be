import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRIMARY_CONNECTION } from 'src/database';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device], PRIMARY_CONNECTION)],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
