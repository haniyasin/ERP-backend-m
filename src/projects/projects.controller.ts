import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Body,
  Put,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from './entities/project.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolesName } from 'src/roles/constants';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { CreateProjectDTO } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDTO) {
    return this.projectsService.create(createProjectDto);
  }

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
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: { data: UpdateProjectDTO },
  ) {
    return this.projectsService.updateProject(id, updateProjectDto.data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}
