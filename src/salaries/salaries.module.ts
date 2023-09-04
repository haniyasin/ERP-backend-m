import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { SalaryService } from './salaries.service';
import { SalaryController } from './salaries.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salary, User])],
  providers: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule {}
