import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { EditPositionDto } from './dto/edit-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { ProjectsService } from 'src/projects/projects.service';
import { DeletePositionDTO } from './dto/delete-position,dto';

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
      project: { id: createPositionDto.project.id },
      company: { id: createPositionDto.company.id },
    });

    const allCompanyPositions = await this.findCompanyPositions(
      createPositionDto.company.id,
    );

    await this.companiesService.updateOpenPositions(
      createPositionDto.company.id,
      allCompanyPositions,
    );

    const allProjectPositions = await this.findProjectPositions(
      createPositionDto.project.id,
    );

    await this.projectsService.updateOpenPositions(
      createPositionDto.project.id,
      allProjectPositions,
    );

    return newPosition;
  }

  async edit(
    id: number,
    editPositionDto: EditPositionDto,
  ): Promise<UpdateResult> {
    const position = this.positionsRepository.findOne({ where: { id } });

    if (!position)
      throw new HttpException(
        `Position with id: ${id} does not exist.`,
        HttpStatus.BAD_REQUEST,
      );
    return await this.positionsRepository.update({ id }, editPositionDto);
  }

  async findOne(id: number): Promise<Position> {
    return this.positionsRepository
      .createQueryBuilder('position')
      .leftJoinAndSelect('position.candidates', 'candidates')
      .leftJoinAndSelect('position.project', 'project')
      .leftJoinAndSelect('position.company', 'company')
      .where('position.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<Position[]> {
    return await this.positionsRepository.find({
      relations: ['project', 'company'],
    });
  }

  getAllByCompany(companyId: number): Promise<Position[]> {
    return this.positionsRepository.find({
      relations: ['project', 'company'],
      where: { company: { id: companyId } },
    });
  }

  async deletePositionById(id: number, deletePositionDto: DeletePositionDTO) {
    const position = await this.positionsRepository.findOne({ where: { id } });

    if (!position) {
      throw new HttpException(
        `Position with id: ${id} does not exist.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletePosition = await this.positionsRepository.delete(id);

    const allCompanyPositions = await this.findCompanyPositions(
      deletePositionDto.companyId,
    );

    await this.companiesService.updateOpenPositions(
      deletePositionDto.companyId,
      allCompanyPositions,
    );

    const allProjectPositions = await this.findProjectPositions(
      deletePositionDto.projectId,
    );

    await this.projectsService.updateOpenPositions(
      deletePositionDto.projectId,
      allProjectPositions,
    );

    return deletePosition;
  }

  async findCompanyPositions(companyId: number) {
    const allPositions = await this.positionsRepository.find({
      where: { company: { id: companyId } },
    });

    return allPositions.length;
  }

  async findProjectPositions(projectId: number) {
    const allPositions = await this.positionsRepository.find({
      where: { project: { id: projectId } },
    });

    return allPositions.length;
  }
}
