import { AbstractEntity } from 'src/database/abstract.entity';
import { Point } from 'geojson';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { GenderType } from '../enum/gender.enum';
import { User } from './user.entity';

@Entity('user_profile')
export class UserProfile extends AbstractEntity {
  @Column()
  age: number;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column()
  nic: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
