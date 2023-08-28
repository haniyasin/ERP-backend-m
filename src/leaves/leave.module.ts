import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, User])],
  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
