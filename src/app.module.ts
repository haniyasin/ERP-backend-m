import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Department } from './departments/entities/departments.entity';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsController } from './departments/departments.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { DepartmentsService } from './departments/departments.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email-service/email.service';
import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { BonusModule } from './bonuses/bonuses.module';
import { Bonus } from './bonuses/entitites/bonus.entity';
import { BonusController } from './bonuses/bonuses.controller';
import { BonusService } from './bonuses/bonuses.service';
import { LeaveModule } from './leaves/leaves.module';
import { Leave } from './leaves/entities/leave.entity';
import { LeaveController } from './leaves/leaves.controller';
import { LeaveService } from './leaves/leaves.service';
import { Salary } from './salaries/entities/salary.entity';
import { SalaryModule } from './salaries/salaries.module';
import { SalaryController } from './salaries/salaries.controller';
import { SalaryService } from './salaries/salaries.service';
import { EmployeeDocumentModule } from './documents/employee/employee-documents.module';
import { EmployeeDocument } from './documents/employee/entities/employee-document.entity';
import { EmployeeDocumentController } from './documents/employee/employee-documents.controller';
import { EmployeeDocumentService } from './documents/employee/employee-documents.service';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './projects/entities/project.entity';
import { ProjectsService } from './projects/projects.service';
import { ProjectsController } from './projects/projects.controller';
import { FinanceModule } from './invoices/invoice.module';
import { FinanceService } from './invoices/invoice.service';
import { FinanceController } from './invoices/invoice.controller';
import { Invoice } from './invoices/entities/invoice.entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/entities/position.entity';
import { PositionsController } from './positions/positions.controller';
import { PositionsService } from './positions/positions.service';
import { CandidatesModule } from './candidates/candidates.module';
import { Candidate } from './candidates/entities/candidate.entity';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';
import { CompaniesDocumentsService } from './documents/company/company.documents.service';
import { CompaniesService } from './companies/companies.service';
import { CompaniesDocumentsController } from './documents/company/company-documents.controller';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesModule } from './companies/companies.module';
import { CompaniesDocuments } from './documents/company/entitites/company-document.entity';
import { CompaniesDocumentsModule } from './documents/company/company.documents.module';
import { Company } from './companies/entities/company.entity';
import { Technologies } from './technologies/entities/technology.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';

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
    ClientsModule,
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
      Client,
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
        Client,
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
    ClientsController,
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
    ClientsService,
  ],
})
export class AppModule {}
