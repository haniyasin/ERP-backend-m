import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { EditPositionDto } from './dto/edit-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class PositionsService {
  constructor(
    private companiesService: CompaniesService,
    private projectsService: ProjectsService,
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const newPosition = await this.positionsRepository.save({
      ...createPositionDto,
      project: { id: createPositionDto.projectId },
      company: { id: createPositionDto.companyId },
    });

    const allPositions = await this.positionsRepository.find({
      where: { company: { id: createPositionDto.companyId } },
    });

    await this.companiesService.updateOpenPositions(
      createPositionDto.companyId,
      allPositions.length,
    );

    await this.projectsService.updateOpenPositions(
      createPositionDto.projectId,
      allPositions.length,
    );

    return newPosition;
  }

  async edit(
    id: number,
    editPositionDto: EditPositionDto,
  ): Promise<UpdateResult> {
    return await this.positionsRepository.update({ id }, editPositionDto);
  }

  async findOne(id: number): Promise<Position> {
    return this.positionsRepository
      .createQueryBuilder('position')
      .leftJoinAndSelect('position.candidates', 'candidates') // Eagerly load the role entity
      .leftJoinAndSelect('position.project', 'project')
      .where('position.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<Position[]> {
    return await this.positionsRepository.find({
      relations: ['project', 'company'],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} position`;
  // }

  // update(id: number, updatePositionDto: UpdatePositionDto) {
  //   return `This action updates a #${id} position`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} position`;
  // }
}
