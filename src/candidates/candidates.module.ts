import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Position } from 'src/positions/entities/position.entity';
import { User } from 'src/users/user.entity';
import { PositionsService } from 'src/positions/positions.service';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';
import { Projects } from 'src/projects/project.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Position, User, Company, Projects]),
  ],
  controllers: [CandidatesController],
  providers: [
    CandidatesService,
    PositionsService,
    CompaniesService,
    ProjectsService,
  ],
})
export class CandidatesModule {}
