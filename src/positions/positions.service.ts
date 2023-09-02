import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { EditPositionDto } from './dto/edit-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    return await this.positionsRepository.save(createPositionDto);
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
    return await this.positionsRepository.find({ relations: ['project'] });
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
