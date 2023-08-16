import { Controller, Get, Param, Delete, UseGuards, Body, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from './project.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolesName } from 'src/roles/role.enum';
import { UpdateProjectDTO } from './dtos/update.project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // @Post()
  // create(@Body() createProjectDto: CreateProjectDto) {
  //   return this.projectsService.create(createProjectDto);
  // }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async findAll(): Promise<Projects[]> {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') projectId: number, @Body() user: UpdateProjectDTO) {
    return this.projectsService.update(projectId, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
