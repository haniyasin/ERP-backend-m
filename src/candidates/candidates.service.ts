import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Position } from 'src/positions/entities/position.entity';
import { PositionsService } from 'src/positions/positions.service';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private positionService: PositionsService,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const candidate: Candidate = await this.createCandidateObject(
      createCandidateDto,
    );
    return await this.candidateRepository.save(candidate);
  }

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  async edit(editCandidateDto: UpdateCandidateDto): Promise<UpdateResult> {
    const candidateId = editCandidateDto.id;
    return await this.candidateRepository.update(candidateId, editCandidateDto);
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }

  private async createCandidateObject(
    createCandidateDto: CreateCandidateDto,
  ): Promise<Candidate> {
    const position = await this.positionService.findOne(
      createCandidateDto.position.id,
    );
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    const candidateObject = new Candidate();
    candidateObject.name = createCandidateDto.name;
    candidateObject.appliedOn = createCandidateDto.appliedOn;
    candidateObject.acceptedOn = createCandidateDto.acceptedOn;
    candidateObject.status = createCandidateDto.status;
    candidateObject.cv = createCandidateDto.cv;
    candidateObject.position = position;
    return candidateObject;
  }
}
