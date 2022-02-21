import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProcessStatus } from './enum';
import { User } from './user.entity';

@Entity()
export class PortfolioLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, (user) => user.portfolioLogList, { nullable: false })
  user: User;

  @Column({ type: 'enum', enum: ProcessStatus })
  portfolioStatus: ProcessStatus;

  @CreateDateColumn()
  createdAt: Date;
}