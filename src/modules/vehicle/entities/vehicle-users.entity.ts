import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('vehicle_users')
export class VehicleUsers extends AbstractEntity {
  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => User, (user) => user.allowed_vehicles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
