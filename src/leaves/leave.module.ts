import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, User])],
  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
