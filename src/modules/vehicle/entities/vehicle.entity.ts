import { AbstractEntity } from 'src/database/abstract.entity';
import { VehicleType } from '../enum/vehicle-type.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { VehicleUsers } from './vehicle-users.entity';
import { VehicleStatus } from '../enum/vehicle-status.enum';

@Entity()
export class Vehicle extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  numberPlate: string;

  @Column({ type: 'enum', enum: VehicleType })
  vehicleType: VehicleType;

  @Column({ type: 'text', array: true })
  image: string[];

  @Column({ type: 'enum', enum: VehicleStatus })
  status: VehicleStatus;

  @ManyToOne(() => User, (user) => user, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => VehicleUsers, (vehicleUsers) => vehicleUsers.vehicle, {
    cascade: true,
  })
  users: VehicleUsers[];
}
