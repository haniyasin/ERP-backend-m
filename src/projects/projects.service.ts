import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Projects } from './project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // create(createProjectDto: CreateProjectDto) {
  //   return 'This action adds a new project';
  // }

  async findAll(): Promise<Projects[]> {
    return await this.projectRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, userId: number): Promise<Projects> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!project)
     throw new HttpException(`Project with id: ${id} not found`, HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.findOne({
      select: ['id','projects'],
      where: {id: userId},
      relations: ['projects']
    })

    if (!user)
      throw new HttpException(`User with id: ${id} not found`, HttpStatus.BAD_REQUEST);

    const userExists = project.users.some((projectUser) => projectUser.id === user.id);
    if (userExists)
      throw new HttpException(`User already exists in the project`, HttpStatus.BAD_REQUEST);

    const projectWithNewUser = {...project, users: [...project.users, user]}
    const newProject = await this.projectRepository.save(projectWithNewUser);

    const userWithNewProject = {...user, projects: [...user?.projects, project]}

    await this.userRepository.save(userWithNewProject);

    await this.userRepository.save({...userWithNewProject, currentProject: newProject})

    return newProject;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  } 
}
