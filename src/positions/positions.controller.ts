import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Position } from './entities/position.entity';
import { EditPositionDto } from './dto/edit-position.dto';
import { UpdateResult } from 'typeorm';
import { RolesName } from 'src/roles/constants';
import { DeletePositionDTO } from './dto/delete-position,dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async createPosition(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionsService.create(createPositionDto);
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async editPosition(
    @Param('id') id: number,
    @Body() editPositionDto: EditPositionDto,
  ): Promise<UpdateResult> {
    return await this.positionsService.edit(id, editPositionDto);
  }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async getAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }

  @Get('byCompany/:id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  getAllByCompany(@Param('id') id: number): Promise<Position[]> {
    return this.positionsService.getAllByCompany(id);
  }

  @Get('byProject/:id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  getAllByProject(@Param('id') id: number): Promise<Position[]> {
    return this.positionsService.getAllByProject(id);
  }

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async getUserById(@Param('id') id: number): Promise<Position> {
    return await this.positionsService.findOne(id);
  }

  @Delete(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  deletePositionById(
    @Param('id') id: number,
    @Body() deletePositionDto: DeletePositionDTO,
  ) {
    return this.positionsService.deletePositionById(id, deletePositionDto);
  }
}
