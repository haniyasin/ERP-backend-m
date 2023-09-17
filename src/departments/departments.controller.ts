import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/departments.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesName } from 'src/roles/constants';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateDepartmentDTO } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  create(@Body() createDepartmentDto: CreateDepartmentDTO) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  getAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }
}
