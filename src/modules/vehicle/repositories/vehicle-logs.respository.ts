import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRIMARY_CONNECTION } from 'src/database';
import { VehicleUsers } from '../entities/vehicle-users.entity';
import { VehicleLog } from '../entities/vehicle-log.entity';

export class VehicleLogsRepository extends Repository<VehicleLog> {
  constructor(
    @InjectRepository(VehicleLog, PRIMARY_CONNECTION)
    vehicleLogs: Repository<VehicleLog>,
  ) {
    super(vehicleLogs.target, vehicleLogs.manager, vehicleLogs.queryRunner);
  }
}
