import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Position } from 'src/positions/entities/position.entity';
import { User } from 'src/users/user.entity';
import { PositionsService } from 'src/positions/positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Position, User])],
  controllers: [CandidatesController],
  providers: [CandidatesService, PositionsService]
})
export class CandidatesModule {}
