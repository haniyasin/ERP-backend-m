import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Department } from './departments/entities/departments.entity';
import { DepartmentsModule } from './departments/departments.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RolesModule } from './roles/roles.module';
import { BonusModule } from './bonuses/bonuses.module';
import { Bonus } from './bonuses/entitites/bonus.entity';
import { LeaveModule } from './leaves/leaves.module';
import { Leave } from './leaves/entities/leave.entity';
import { Salary } from './salaries/entities/salary.entity';
import { SalaryModule } from './salaries/salaries.module';
import { EmployeeDocumentModule } from './documents/employee/employee-documents.module';
import { EmployeeDocument } from './documents/employee/entities/employee-document.entity';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './projects/entities/project.entity';
import { FinanceModule } from './invoices/invoice.module';
import { Invoice } from './invoices/entities/invoice.entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/entities/position.entity';
import { CandidatesModule } from './candidates/candidates.module';
import { Candidate } from './candidates/entities/candidate.entity';
import { CompaniesModule } from './companies/companies.module';
import { CompaniesDocuments } from './documents/company/entitites/company-document.entity';
import { CompaniesDocumentsModule } from './documents/company/company.documents.module';
import { Company } from './companies/entities/company.entity';
import { Technologies } from './technologies/entities/technology.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';

@Module({
  imports: [
    UsersModule,
    DepartmentsModule,
    AuthModule,
    RolesModule,
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
      port: parseInt(process.env.DB_PORT),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
