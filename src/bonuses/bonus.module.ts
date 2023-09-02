import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonus } from './entitites/bonus.entity';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus, User])],
  providers: [BonusService],
  controllers: [BonusController],
})
export class BonusModule {}
