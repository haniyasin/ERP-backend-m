import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { Position } from './entities/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';
import { Projects } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position, Candidate, Company, Projects, User]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService, CompaniesService, ProjectsService],
})
export class PositionsModule {}
