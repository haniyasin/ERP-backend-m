import { Module } from '@nestjs/common';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompaniesService],
    controllers: [CompaniesController]
  })
  export class CompaniesModule {}
