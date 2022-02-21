import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruit } from './recruit.entity';
import { User } from './user.entity';

@Entity()
export class WishRecruit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, (user) => user.wishRecruitList, { nullable: false })
  user: User;

  @ManyToOne(() => Recruit, (recruit) => recruit.wishRecruitList, {
    nullable: false,
  })
  recruit: Recruit;

  @CreateDateColumn()
  createdAt: Date;
}
