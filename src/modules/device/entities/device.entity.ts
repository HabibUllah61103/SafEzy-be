import { AbstractEntity } from 'src/database/abstract.entity';
import { DeviceStatus } from '../enum/device-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { VehicleLog } from 'src/modules/vehicle/entities/vehicle-log.entity';

@Entity()
export class Device extends AbstractEntity {
  @Column({ type: 'enum', enum: DeviceStatus })
  status: DeviceStatus;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => VehicleLog, (vehicleLog) => vehicleLog.device, {
    cascade: true,
  })
  logs: VehicleLog[];
}
