import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Projects } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createProjectDto: CreateProjectDTO) {
    return this.projectRepository.save(createProjectDto);
  }

  async findAll(): Promise<Projects[]> {
    return await this.projectRepository.find({ relations: ['company'] });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['company'],
    });
  }

  async updateOpenPositions(id: number, numberOfOpenPositions: number) {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project)
      throw new HttpException(
        `Project with id: ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );

    return this.projectRepository.save({
      ...project,
      openPositions: numberOfOpenPositions,
    });
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDTO) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project)
      throw new HttpException(
        `Project with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    this.projectRepository.merge(project, updateProjectDto);

    return await this.projectRepository.save(project);
  }

  async update(id: number, userId: number): Promise<Projects> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!project)
      throw new HttpException(
        `Project with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.userRepository.findOne({
      select: ['id', 'projects'],
      where: { id: userId },
      relations: ['projects'],
    });

    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    const userExists = project.users.some(
      (projectUser) => projectUser.id === user.id,
    );
    if (userExists)
      throw new HttpException(
        `User already exists in the project`,
        HttpStatus.BAD_REQUEST,
      );

    const projectWithNewUser = { ...project, users: [...project.users, user] };
    const newProject = await this.projectRepository.save(projectWithNewUser);

    const userWithNewProject = {
      ...user,
      projects: [...user?.projects, project],
    };

    await this.userRepository.save(userWithNewProject);

    await this.userRepository.save({
      ...userWithNewProject,
      currentProject: newProject,
    });

    return newProject;
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    return this.projectRepository.remove(project);
  }
}
