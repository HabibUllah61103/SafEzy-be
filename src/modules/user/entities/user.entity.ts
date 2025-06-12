import { AbstractEntity } from 'src/database/abstract.entity';
import { Otp } from 'src/modules/iam/otp/otp.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { FcmToken } from './fcm-token.entity';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
import { UserProfile } from './user-profile.entity';
import { VehicleUsers } from 'src/modules/vehicle/entities/vehicle-users.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { ProviderType } from '../interfaces/provider-type.type';
import { Device } from 'src/modules/device/entities/device.entity';

@Entity('user')
export class User extends AbstractEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'profile_image_url', nullable: true })
  profileImageUrl: string;

  @Column({ type: 'text', array: true, nullable: true })
  images: string[];

  @Column({ name: 'is_verified', type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ name: 'is_onboarded', type: 'boolean', default: false })
  isOnboarded: boolean;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: ProviderType,
    default: ProviderType.EMAIL_PASSWORD,
    nullable: true,
  })
  providerType: ProviderType;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: true,
  })
  role: UserRole;

  @OneToMany(() => Otp, (otp) => otp.user, {
    cascade: true,
  })
  otps: Otp[];

  @OneToMany(() => FcmToken, (fcmToken) => fcmToken.user, {
    cascade: true,
  })
  fcmTokens: FcmToken[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, {
    cascade: true,
  })
  vehicles: Vehicle[];

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: true,
  })
  profile: UserProfile;

  @OneToMany(() => VehicleUsers, (vehicleUsers) => vehicleUsers.user, {
    cascade: true,
  })
  allowed_vehicles: VehicleUsers[];

  @OneToMany(() => Notification, (notification) => notification.receiver, {
    cascade: true,
  })
  notificationsReceived: Notification;

  @OneToMany(() => Notification, (notification) => notification.sender, {
    cascade: true,
  })
  notificationsSent: Notification[];

  @OneToMany(() => Device, (device) => device.owner, {
    cascade: true,
  })
  devices: Device[];
}
