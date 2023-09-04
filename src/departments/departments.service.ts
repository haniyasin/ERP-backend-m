import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/departments.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDTO } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDTO): Promise<Department | null> {
    return this.departmentsRepository.save(createDepartmentDto);
  }

  findOne(id: number): Promise<Department | null> {
    return this.departmentsRepository.findOneBy({ id });
  }

  findAll(): Promise<Department[]> {
    return this.departmentsRepository.find();
  }
}
