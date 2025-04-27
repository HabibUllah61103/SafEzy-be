import { AbstractEntity } from 'src/database/abstract.entity';
import { VehicleLogType } from '../enum/vehicle-log-type.enum';

export class VehicleLog extends AbstractEntity {
  logType: VehicleLogType;
}
