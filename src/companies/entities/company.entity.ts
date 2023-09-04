import { CompaniesDocuments } from 'src/documents/company/entitites/company-document.entity';
import { Position } from 'src/positions/entities/position.entity';
import { Projects } from 'src/projects/entities/project.entity';
import { Technologies } from 'src/technologies/entities/technology.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'simple-array' })
  contacts: string;

  @Column()
  employeeSize: number;

  @Column({ nullable: true, default: 0 })
  openPositions: number;

  @OneToMany(() => Position, (positions) => positions.company)
  positions: Position[];

  @OneToMany(() => Technologies, (technologies) => technologies.name)
  relTechnologies: Technologies[];

  @OneToMany(() => Projects, (project) => project.company)
  projects: Projects[];

  @OneToMany(() => CompaniesDocuments, (documents) => documents.company)
  documents: CompaniesDocuments[];

  @DeleteDateColumn()
  deletedAt: Date;
}
