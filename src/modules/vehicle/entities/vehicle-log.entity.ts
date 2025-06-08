import { AbstractEntity } from 'src/database/abstract.entity';
import { VehicleLogType } from '../enum/vehicle-log-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Device } from 'src/modules/device/entities/device.entity';

@Entity('vehicle_log')
export class VehicleLog extends AbstractEntity {
  @Column({ type: 'enum', enum: VehicleLogType })
  logType: VehicleLogType;

  @Column({ name: 'vehicle_id' })
  vehicleId: number;

  @Column({ name: 'device_id' })
  deviceId: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Device, (device) => device.logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
