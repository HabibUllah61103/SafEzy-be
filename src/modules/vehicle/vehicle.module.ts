import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { PRIMARY_CONNECTION } from 'src/database';
import { VehicleRepository } from './repositories/vehicle.respository';
import { VehicleUsers } from './entities/vehicle-users.entity';
import { UserModule } from '../user/user.module';
import { VehicleLog } from './entities/vehicle-log.entity';
import { VehicleLogsRepository } from './repositories/vehicle-logs.respository';
import { VehicleUsersRepository } from './repositories/vehicle-users.respository';
import { VehicleIntrudersRepository } from './repositories/vehicle-intruders.respository';
import { VehicleIntruders } from './entities/vehicle-intruders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Vehicle, VehicleUsers, VehicleLog, VehicleUsers, VehicleIntruders],
      PRIMARY_CONNECTION,
    ),
    UserModule,
  ],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    VehicleRepository,
    VehicleLogsRepository,
    VehicleUsersRepository,
    VehicleIntrudersRepository,
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
