import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { Public } from 'src/decorators/public.decorator';
import { RolesName } from 'src/roles/constants';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post('createPosition')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async createPosition(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionsService.create(createPositionDto);
  }

  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async editPosition(
    @Param('id') id: number,
    @Body() editPositionDto: EditPositionDto,
  ): Promise<UpdateResult> {
    return await this.positionsService.edit(id, editPositionDto);
  }

  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }

  @Get('positionById/:id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async getUserById(@Param('id') id: number): Promise<Position> {
    return await this.positionsService.findOne(id);
  }
}
