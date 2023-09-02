import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Public } from 'src/decorators/public.decorator';
import { CompanyDTO } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Public()
  @Get()
  async getAll(): Promise<Company[]> {
    const companies = await this.companiesService.getAll();
    return companies;
  }

  @Public()
  @Post('addCompany')
  async create(@Body() company: CompanyDTO): Promise<Company> {
    return await this.companiesService.create(company);
  }

  
  @Delete()
  async deleteCompanyByName(@Body('name') name: string): Promise<string> {
    await this.companiesService.removeCompany(name);
    return 'Company Deleted successfuly'
  } 

  @Put()
  async editCompany(@Param('name') name: string, @Body() CompanyDTO: CompanyDTO): Promise<Company> {
    return await this.companiesService.updateCompany(name, CompanyDTO);
}  



}
