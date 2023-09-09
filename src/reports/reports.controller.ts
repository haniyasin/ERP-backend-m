import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Bind,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './dto/create-report.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolesName } from 'src/roles/constants';
import { Reports } from './entities/report.entity';
import { UpdateResult } from 'typeorm';
import { EditReportDTO } from './dto/edit-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.reportsService.findAll();
  }

  @Post()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  @UsePipes(new ValidationPipe())
  create(
    @UploadedFile() document: Express.Multer.File,
    @Body() report: CreateReportDTO,
  ): Promise<Reports> {
    return this.reportsService.create(document, report);
  }

  @Delete(':id')
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  delete(@Param('id') id: number): Promise<Reports> {
    return this.reportsService.delete(id);
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  editUser(
    @Param('id') id: number,
    @Body() editReportDto: EditReportDTO,
  ): Promise<UpdateResult> {
    return this.reportsService.updateReport(id, editReportDto);
  }
}
