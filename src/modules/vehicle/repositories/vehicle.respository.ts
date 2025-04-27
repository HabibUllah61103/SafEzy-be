import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRIMARY_CONNECTION } from 'src/database';
import { Vehicle } from '../entities/vehicle.entity';

export class VehicleRepository extends Repository<Vehicle> {
  constructor(
    @InjectRepository(Vehicle, PRIMARY_CONNECTION)
    vehicle: Repository<Vehicle>,
  ) {
    super(vehicle.target, vehicle.manager, vehicle.queryRunner);
  }
}
