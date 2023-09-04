import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonus } from './entitites/bonus.entity';
import { BonusService } from './bonuses.service';
import { BonusController } from './bonuses.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus, User])],
  providers: [BonusService],
  controllers: [BonusController],
})
export class BonusModule {}
