import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './salary.entity';
import { CreateSalaryDTO } from './dtos/create.salary.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary)
    private salaryRepository: Repository<Salary>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllSalaries(userId: number): Promise<Salary[]> {
    try {
      const salaries = await this.salaryRepository.find({ relations: ['user'] });
      return salaries.filter(salary => salary?.user?.id == userId);
    } catch (error) {
      throw new Error(`Error when fetching leaves: ${error}`);
    }
  }

  async createNewSalary(document: Express.Multer.File, createSalaryDto: CreateSalaryDTO): Promise<Salary> {
    const id = createSalaryDto.user.id;
    const user = await this.userRepository.findOne({where: {id}});

    if(!user) throw new Error(`User with id ${id} not found`);

    createSalaryDto.user = user;

    const newSalary = await this.salaryRepository.save({...createSalaryDto, document: document.buffer});

    const userWithCurrentSalary = {...user, currentSalary: newSalary};

    await this.userRepository.save(userWithCurrentSalary);

    return newSalary;
  }
}