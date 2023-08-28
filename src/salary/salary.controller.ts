import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesName } from 'src/roles/constants';
import { SalaryService } from './salary.service';
import { Salary } from './salary.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateSalaryDTO } from './dto/create.salary.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('salaries')
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async getAll(@Param() body: { id: number }): Promise<Salary[] | null> {
    return await this.salaryService.getAllSalaries(body.id);
  }

  @Post()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  async createSalary(
    @UploadedFile() document: Express.Multer.File,
    @Body() createSalaryDTO: CreateSalaryDTO,
  ): Promise<Salary> {
    return await this.salaryService.createNewSalary(document, createSalaryDTO);
  }
}
