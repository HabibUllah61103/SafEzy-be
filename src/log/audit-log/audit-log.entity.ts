import { AuditActionEnum } from 'src/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audit_log')
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: AuditActionEnum;

  @Column()
  entity: string;

  @Column()
  userId: number;

  @Column({ type: 'json', nullable: true })
  beforeData: any;

  @Column({ type: 'json', nullable: true })
  afterData: any;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
