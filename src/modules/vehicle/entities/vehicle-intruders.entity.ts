import { AbstractEntity } from 'src/database/abstract.entity';
import { Vehicle } from './vehicle.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('vehicle_intruder')
export class VehicleIntruders extends AbstractEntity {
  @Column()
  image: string;

  @Column({ name: 'vehicle_id' })
  vehicleId: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.intruders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
