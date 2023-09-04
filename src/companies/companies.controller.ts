import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Public } from 'src/decorators/public.decorator';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { UpdateResult } from 'typeorm';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Public()
  @Get()
  getAll(): Promise<Company[]> {
    return this.companiesService.getAll();
  }

  @Public()
  @Get(':id')
  getOneById(@Param('id') id: number): Promise<Company> {
    return this.companiesService.getOneById(id);
  }

  @Public()
  @Post()
  create(@Body() createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    return this.companiesService.create(createCompanyDTO);
  }

  @Delete()
  deleteCompanyByName(@Body('name') name: string): Promise<UpdateResult> {
    return this.companiesService.removeCompany(name);
  }

  @Put(':id')
  editCompany(
    @Param('id') id: number,
    @Body() updateCompanyDTO: { data: UpdateCompanyDTO },
  ): Promise<Company> {
    return this.companiesService.updateCompany(id, updateCompanyDTO.data);
  }
}
