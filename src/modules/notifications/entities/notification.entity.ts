import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { NotificationType } from '../enums/notification-type.enum';
import { AbstractEntity } from 'src/database/abstract.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('notification')
export class Notification extends AbstractEntity {
  @Column()
  receiverId: number;

  @Column({ nullable: true })
  senderId: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ nullable: true })
  resourceId: number;

  @Column({ nullable: true, default: false })
  read: boolean;

  @ManyToOne(() => User, (user) => user.notificationsReceived, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receiverId' })
  public receiver: User;

  @ManyToOne(() => User, (user) => user.notificationsSent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'senderId' })
  public sender: User;
}
