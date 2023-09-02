import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EmailService } from 'src/email-service/email.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/roles.entity';
import { Department } from 'src/departments/entities/departments.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Bonus } from 'src/bonuses/entitites/bonus.entity';
import { SalaryService } from 'src/salary/salary.service';
import { EmployeeDocumentService } from 'src/documents/employee/employee.document.service';
import { EmployeeDocument } from 'src/documents/employee/entities/employee.document.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      User,
      Role,
      Department,
      Leave,
      Salary,
      Bonus,
      EmployeeDocument,
    ]),
    // Making JwtModule global allows us to import the module anywhere else
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    EmailService,
    RolesService,
    SalaryService,
    EmployeeDocumentService,
    {
      // This is to make AuthGard global so we don't need to assign
      // UseGuards on each Request/Handler()
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
