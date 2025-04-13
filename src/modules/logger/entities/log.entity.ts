import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column } from 'typeorm';
import { NodeEnv } from '../enums/node-env.enum';

@Entity()
export class Log extends AbstractEntity {
  @Column()
  public message: string;

  @Column({ nullable: true })
  public stack?: string;

  @Column({ nullable: true })
  public context?: string;

  @Column({
    type: 'enum',
    enum: NodeEnv,
  })
  public env: string;
}
