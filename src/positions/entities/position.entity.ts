import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Projects } from 'src/projects/project.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Candidate, (candidate) => candidate.position)
  candidates: Candidate[];

  @ManyToOne(() => Projects, (project) => project.positions)
  project: Projects;

  @ManyToOne(() => Company, (companies) => companies.openPositions)
  company: Company;
}
