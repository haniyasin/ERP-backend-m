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
    ProjectsModule,
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
      Projects,
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
        Projects,
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
    ProjectsController,
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
    ProjectsService,
  ],
})
export class AppModule {}
