import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/departments.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesName } from 'src/roles/constants';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  create(): string {
    return 'This action adds new department';
  }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  getAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }
}
