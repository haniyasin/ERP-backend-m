import { Position } from 'src/positions/entities/position.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  appliedOn: string;

  @Column({ nullable: true })
  acceptedOn: string | null;

  @Column()
  status: string;

  @Column({ type: 'bytea', nullable: true })
  cv: Buffer;

  @OneToOne(() => User, (user) => user.candidate)
  user: User;

  @ManyToOne(() => Position, (position) => position.candidates)
  position: Position;
}
