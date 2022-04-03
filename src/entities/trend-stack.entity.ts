import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { Techstack } from './techstack.entity';

@Entity()
export class TrendStack {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => Task, (task) => task.trendStacks, { nullable: false })
  task: Task;

  @ManyToOne(() => Techstack, (techstack) => techstack.trendStacks, {
    nullable: false,
  })
  techstack: Techstack;

  @Column()
  priority: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
