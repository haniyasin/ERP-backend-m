import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { CreateLeaveDTO } from './dto/create.leave.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllLeaves(userId: number): Promise<Leave[]> {
    try {
      const leaves = await this.leaveRepository.find({ relations: ['user'] });
      return leaves.filter((leaves) => leaves.user.id == userId);
    } catch (error) {
      throw new HttpException(
        `Error Occurred: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNewLeave(
    document: Express.Multer.File,
    createLeaveDto: CreateLeaveDTO,
  ): Promise<Leave> {
    if (!document)
      throw new HttpException('Document is Required!', HttpStatus.BAD_REQUEST);

    const id = createLeaveDto.user.id;
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'fullName',
        'email',
        'title',
        'currentSalary',
        'startDate',
        'isContractor',
        'departments',
        'picture',
        'hasLeft',
        'dateLeftOn',
        'leaveDaysLeft',
      ],
      where: { id },
      relations: [
        'departments',
        'currentSalary',
        'salaries',
        'leaves',
        'bonuses',
        'documents',
        'projects',
        'currentProject',
      ],
    });

    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    if (createLeaveDto.type !== 'Paid') {
      const newLeave = await this.leaveRepository.save({
        ...createLeaveDto,
        user: user,
        document: document.buffer,
      });

      await this.usersRepository.save({
        ...user,
        leaves: [...user.leaves, newLeave],
      });

      return newLeave;
    }

    const startDate = +new Date(createLeaveDto.startDate);
    const endDate = +new Date(createLeaveDto.endDate);
    const leaveDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    if (user.leaveDaysLeft - leaveDays < 0)
      throw new HttpException(
        'Employee does not have enough Leave Days!',
        HttpStatus.BAD_REQUEST,
      );

    const newLeave = await this.leaveRepository.save({
      ...createLeaveDto,
      user: user,
      document: document.buffer,
    });

    await this.usersRepository.save({
      ...user,
      leaves: [...user.leaves, newLeave],
      leaveDaysLeft: user.leaveDaysLeft - leaveDays,
    });

    return newLeave;
  }
}
