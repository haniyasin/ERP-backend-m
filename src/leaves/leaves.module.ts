import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';
import { LeaveService } from './leaves.service';
import { LeaveController } from './leaves.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave, User])],
  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
