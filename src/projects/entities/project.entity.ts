import { Company } from 'src/companies/entities/company.entity';
import { Position } from 'src/positions/entities/position.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: 0 })
  openPositions: number;

  @OneToMany(() => Position, (position) => position.project)
  positions: Position[];

  @ManyToOne(() => Company, (company) => company.projects)
  company: Company;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];
}
