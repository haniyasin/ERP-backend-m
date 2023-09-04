import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { EmailService } from 'src/email-service/email.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { Department } from 'src/departments/entities/departments.entity';
import { LeaveService } from 'src/leaves/leaves.service';
import { Leave } from 'src/leaves/entities/leave.entity';
import { Bonus } from 'src/bonuses/entitites/bonus.entity';
import { BonusService } from 'src/bonuses/bonuses.service';
import { Salary } from 'src/salaries/entities/salary.entity';
import { SalaryService } from 'src/salaries/salaries.service';
import { EmployeeDocument } from 'src/documents/employee/entities/employee-document.entity';
import { EmployeeDocumentService } from 'src/documents/employee/employee-documents.service';
import { Projects } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Department,
      Leave,
      Bonus,
      Salary,
      EmployeeDocument,
      Projects,
    ]),
  ],
  providers: [
    UsersService,
    EmailService,
    RolesService,
    DepartmentsService,
    LeaveService,
    BonusService,
    SalaryService,
    EmployeeDocumentService,
    ProjectsService,
  ],
  controllers: [UserController],
})
export class UsersModule {}
