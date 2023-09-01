import { Body, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDTO } from './company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(company: CompanyDTO): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async getAll(): Promise<Company[]> {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async getOne(name: string): Promise<Company> {
    return await this.companyRepository.findOne({ where: { name } });
  }

  async removeCompany(name: string): Promise<void> {
    const company = await this.getOne(name);
    if (!company) throw new Error(`Company with name ${name} not found`);
    await this.companyRepository.remove(company);
  }

  async updateCompany(name: string, updatedData: CompanyDTO): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { name } });
    
    if (!company)
      throw new Error(`Company with name ${name} not found`);

    Object.assign(company, updatedData);

    return await this.companyRepository.save(company);
  }}
