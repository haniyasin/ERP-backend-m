import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { EmailService } from 'src/email-service/email.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { Department } from 'src/departments/departments.entity';
import { LeaveService } from 'src/leaves/leave.service';
import { Leave } from 'src/leaves/leave.entity';
import { Bonus } from 'src/bonuses/bonus.entity';
import { BonusService } from 'src/bonuses/bonus.service';
import { Salary } from 'src/salary/salary.entity';
import { SalaryService } from 'src/salary/salary.service';
import { EmployeeDocument } from 'src/documents/employee/employee.document.entity';
import { EmployeeDocumentService } from 'src/documents/employee/employee.document.service';
import { Projects } from 'src/projects/project.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Department, Leave, Bonus, Salary, EmployeeDocument, Projects])],
  providers: [UsersService, EmailService, RolesService, DepartmentsService, LeaveService, BonusService, SalaryService, EmployeeDocumentService, ProjectsService],
  controllers: [UserController]
})
export class UsersModule {}
