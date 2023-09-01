import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Role } from './roles/roles.entity';
import { Department } from './departments/departments.entity';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsController } from './departments/departments.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/user.service';
import { DepartmentsService } from './departments/departments.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email-service/email.service';
import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { BonusModule } from './bonuses/bonus.module';
import { Bonus } from './bonuses/bonus.entity';
import { BonusController } from './bonuses/bonus.controller';
import { BonusService } from './bonuses/bonus.service';
import { LeaveModule } from './leaves/leave.module';
import { Leave } from './leaves/leave.entity';
import { LeaveController } from './leaves/leave.controller';
import { LeaveService } from './leaves/leave.service';
import { Salary } from './salary/salary.entity';
import { SalaryModule } from './salary/salary.module';
import { SalaryController } from './salary/salary.controller';
import { SalaryService } from './salary/salary.service';
import { EmployeeDocumentModule } from './documents/employee/employee.document.module';
import { EmployeeDocument } from './documents/employee/employee.document.entity';
import { EmployeeDocumentController } from './documents/employee/employee.document.controller';
import { EmployeeDocumentService } from './documents/employee/employee.document.service';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './projects/project.entity';
import { ProjectsService } from './projects/projects.service';
import { ProjectsController } from './projects/projects.controller';
import { FinanceModule } from './finance/finance.module';
import { FinanceService } from './finance/finance.service';
import { FinanceController } from './finance/finance.controller';
import { Invoice } from './finance/entities/invoice.entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/entities/position.entity';
import { PositionsController } from './positions/positions.controller';
import { PositionsService } from './positions/positions.service';
import { CandidatesModule } from './candidates/candidates.module';
import { Candidate } from './candidates/entities/candidate.entity';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';
import { CompaniesDocumentsService } from './documents/company/companies.documents.service';
import { CompaniesService } from './companies/companies.service';
import { CompaniesDocumentsController } from './documents/company/companies.documents.controller';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesModule } from './companies/companies.module';
import { CompaniesDocuments } from './documents/company/companies.documents.entity';
import { CompaniesDocumentsModule } from './documents/company/companies.documents.module';
import { Company } from './companies/company.entity';
import { Technologies } from './technologies/technologies.entity';

@Module({
  imports: [
    UsersModule,
    DepartmentsModule,
    AuthModule,
    RolesModule,
    DepartmentsModule,
    BonusModule,
    LeaveModule,
    SalaryModule,
    EmployeeDocumentModule,
    CompaniesDocumentsModule,
    ProjectsModule,
    FinanceModule,
    PositionsModule,
    CandidatesModule,
    CompaniesModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDGRID_HOST,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Role,
      Department,
      Bonus,
      Leave,
      Salary,
      EmployeeDocument,
      CompaniesDocuments,
      Projects,
      Invoice,
      Position,
      Candidate,
      Company,
      Technologies,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_HOST),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Role,
        Department,
        Bonus,
        Leave,
        Salary,
        EmployeeDocument,
        CompaniesDocuments,
        Projects,
        Invoice,
        Position,
        Candidate,
        Company,
        Technologies,
      ],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    DepartmentsController,
    UserController,
    AuthController,
    RolesController,
    BonusController,
    LeaveController,
    SalaryController,
    EmployeeDocumentController,
    CompaniesDocumentsController,
    ProjectsController,
    FinanceController,
    PositionsController,
    CandidatesController,
    CompaniesController,
  ],
  providers: [
    AppService,
    UsersService,
    DepartmentsService,
    EmailService,
    RolesService,
    BonusService,
    LeaveService,
    SalaryService,
    EmployeeDocumentService,
    CompaniesDocumentsService,
    ProjectsService,
    FinanceService,
    PositionsService,
    CandidatesService,
    CompaniesService,
  ],
})
export class AppModule {}
