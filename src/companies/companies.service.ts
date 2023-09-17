import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDTO): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name },
    });

    console.log(company, 'company');
    console.log(createCompanyDto, 'dto');

    if (company)
      throw new HttpException(
        'Company with that name already exists',
        HttpStatus.BAD_REQUEST,
      );

    return this.companyRepository.save(createCompanyDto);
  }

  getAll(): Promise<Company[]> {
    return this.companyRepository.find({
      relations: ['projects', 'positions'],
    });
  }

  getOneById(id: number): Promise<Company> {
    return this.companyRepository.findOne({
      relations: ['projects', 'positions'],
      where: { id },
    });
  }

  async removeCompany(id: number): Promise<UpdateResult> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new Error(`Company with id ${id} not found`);

    return this.companyRepository.softDelete(company.id);
  }

  async updateOpenPositions(id: number, numberOfOpenPositions: number) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company)
      throw new HttpException(
        `Company with id: ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );

    return this.companyRepository.save({
      ...company,
      openPositions: numberOfOpenPositions,
    });
  }

  async updateCompany(
    id: number,
    updateCompanyDTO: UpdateCompanyDTO,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

    if (!company)
      throw new HttpException(
        `Company with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    Object.assign(company, updateCompanyDTO);

    return this.companyRepository.save(company);
  }
}
