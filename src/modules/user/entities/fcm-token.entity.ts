import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity('fcm_tokens')
export class FcmToken extends AbstractEntity {
  @Column()
  public token: string;

  @ManyToOne(() => User, (user) => user.fcmTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;
}
