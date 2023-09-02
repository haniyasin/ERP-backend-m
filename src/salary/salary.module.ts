import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salary, User])],
  providers: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule {}
