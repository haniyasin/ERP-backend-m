import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Candidate } from './entities/candidate.entity';
import { RolesName } from 'src/roles/constants';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('createCandidate')
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return await this.candidatesService.create(createCandidateDto);
  }

  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<Candidate[]> {
    return await this.candidatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put('editCandidate')
  async edit(
    @Body() editCandidateDto: UpdateCandidateDto,
  ): Promise<UpdateResult> {
    return await this.candidatesService.edit(editCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
