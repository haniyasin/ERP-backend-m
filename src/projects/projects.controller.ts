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
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  create(@Body() createProjectDto: CreateProjectDTO) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  async findAll(): Promise<Projects[]> {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put('addUser/:id')
  @Roles(RolesName.ADMIN, RolesName.BDM, RolesName.HR)
  @UseGuards(RolesGuard)
  updateUserProject(@Param('id') id: number, @Body() body: { userId: number }) {
    return this.projectsService.update(id, body.userId);
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: { data: UpdateProjectDTO },
  ) {
    return this.projectsService.updateProject(id, updateProjectDto.data);
  }

  @Delete(':id')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}
