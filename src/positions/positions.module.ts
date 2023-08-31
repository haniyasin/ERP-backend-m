import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { Position } from './entities/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Candidate])],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
