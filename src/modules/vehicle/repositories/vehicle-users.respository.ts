import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRIMARY_CONNECTION } from 'src/database';
import { VehicleUsers } from '../entities/vehicle-users.entity';

export class VehicleUsersRepository extends Repository<VehicleUsers> {
  constructor(
    @InjectRepository(VehicleUsers, PRIMARY_CONNECTION)
    vehicleUsers: Repository<VehicleUsers>,
  ) {
    super(vehicleUsers.target, vehicleUsers.manager, vehicleUsers.queryRunner);
  }
}
