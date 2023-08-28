import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';
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
  getAll(@Req() request: Request): Promise<Department[]> {
    return this.departmentsService.findAll();
  }
}
