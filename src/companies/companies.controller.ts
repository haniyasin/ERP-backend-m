import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { UpdateResult } from 'typeorm';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { RolesName } from 'src/roles/constants';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  @Roles(RolesName.ADMIN, RolesName.BDM, RolesName.HR)
  @UseGuards(RolesGuard)
  getAll(): Promise<Company[]> {
    return this.companiesService.getAll();
  }

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  getOneById(@Param('id') id: number): Promise<Company> {
    return this.companiesService.getOneById(id);
  }

  @Post()
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  create(@Body() createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    return this.companiesService.create(createCompanyDTO);
  }

  @Delete(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  deleteCompanyByName(@Param('id') id: number): Promise<UpdateResult> {
    return this.companiesService.removeCompany(id);
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  editCompany(
    @Param('id') id: number,
    @Body() updateCompanyDTO: { data: UpdateCompanyDTO },
  ): Promise<Company> {
    return this.companiesService.updateCompany(id, updateCompanyDTO.data);
  }
}
