import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type BonusType = 'Performance' | 'Annual' | 'Sign-on' | 'Other';

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: ['Performance', 'Annual', 'Sign-on', 'Other'] })
  type: BonusType;

  @Column({ nullable: true, type: 'bytea' })
  document: Buffer;

  @ManyToOne(() => User, (user) => user.bonuses)
  user: User;
}
