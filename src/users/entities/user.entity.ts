import { Bonus } from 'src/bonuses/entitites/bonus.entity';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Department } from 'src/departments/entities/departments.entity';
import { EmployeeDocument } from 'src/documents/employee/entities/employee-document.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { Projects } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Salary } from 'src/salaries/entities/salary.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true, default: false })
  isContractor: boolean;

  @Column({ nullable: true, type: 'bytea' })
  picture: Buffer;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Department)
  @JoinTable()
  departments: Department[];

  @OneToMany(() => Bonus, (bonus) => bonus.user)
  bonuses: Bonus[];

  @OneToMany(() => Leave, (leave) => leave.user)
  leaves: Leave[];

  @Column('decimal', { precision: 10, scale: 2, nullable: true, default: 0 })
  leaveDaysLeft: number;

  @OneToMany(() => EmployeeDocument, (document) => document.user)
  documents: EmployeeDocument[];

  @OneToMany(() => Salary, (salary) => salary.user)
  salaries: Salary[];

  @OneToOne(() => Salary, { nullable: true })
  @JoinColumn()
  currentSalary: Salary;

  @ManyToMany(() => Projects, (project) => project.users)
  @JoinTable()
  projects: Projects[];

  @OneToOne(() => Projects, { nullable: true })
  @JoinColumn()
  currentProject: Projects;

  @OneToOne(() => Candidate)
  @JoinColumn()
  candidate: Candidate | null;

  @Column({ default: false })
  hasLeft: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dateLeftOn: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp' })
  deleteDate: Date;
}
