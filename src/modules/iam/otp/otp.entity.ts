import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OtpPurpose } from './enums/otp-purpose.enum';
import { AbstractEntity } from 'src/database/abstract.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('otps')
export class Otp extends AbstractEntity {
  @Column()
  otp: string;

  @Column({
    type: 'enum',
    enum: OtpPurpose,
  })
  purpose: OtpPurpose;

  @ManyToOne(() => User, (user) => user.otps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
