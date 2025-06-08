import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRIMARY_CONNECTION } from 'src/database';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleIntruders } from '../entities/vehicle-intruders.entity';

export class VehicleIntrudersRepository extends Repository<VehicleIntruders> {
  constructor(
    @InjectRepository(VehicleIntruders, PRIMARY_CONNECTION)
    vehicleIntruders: Repository<VehicleIntruders>,
  ) {
    super(
      vehicleIntruders.target,
      vehicleIntruders.manager,
      vehicleIntruders.queryRunner,
    );
  }
}
