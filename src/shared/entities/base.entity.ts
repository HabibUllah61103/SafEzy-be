import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date;

  @Column({ nullable: true })
  public created_by: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date;

  @Column({ nullable: true })
  public last_updated_by: number;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deleted_at: Date;

  @Column({ nullable: true })
  public deleted_By: number;
}
