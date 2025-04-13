import { LogLevelEnum } from 'src/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('app_log')
export class AppLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: LogLevelEnum;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  info: string;

  @Column({ nullable: true })
  entity: string;

  @Column({ nullable: true })
  trace: string;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
