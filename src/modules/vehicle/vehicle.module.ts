import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { PRIMARY_CONNECTION } from 'src/database';
import { VehicleRepository } from './repositories/vehicle.respository';
import { VehicleUsers } from './entities/vehicle-users.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, VehicleUsers], PRIMARY_CONNECTION),
    UserModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
  exports: [VehicleService],
})
export class VehicleModule {}
