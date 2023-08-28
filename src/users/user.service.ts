import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';
import { generateRandomPassword } from 'src/utils/generatePass';
import { hashPass } from 'src/utils/hashPass';
import { EmailService } from 'src/email-service/email.service';
import { registerDto } from 'src/auth/dto/auth.register.dto';
import { RolesService } from 'src/roles/roles.service';
import { validatePassword } from 'src/utils/isValidPassword';
import { Department } from 'src/departments/departments.entity';
import { EditUserDTO } from './dto/edit.user.dto';
import { SalaryService } from 'src/salary/salary.service';
import { getLeaveDaysLeft } from 'src/utils/getLeaveDaysLeft';
import { DeleteUserDTO } from './dto/delete.user.dto';
import { EmployeeDocumentService } from 'src/documents/employee/employee.document.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    private emailService: EmailService,
    private roleService: RolesService,
    private salaryService: SalaryService,
    private employeeDocumentService: EmployeeDocumentService,
  ) {}

  async checkIsDBEmpty(): Promise<boolean> {
    const usersCount = await this.usersRepository.count();

    if (usersCount === 0) return true;

    return false;
  }

  async getAll(): Promise<User[] | null> {
    return await this.usersRepository.find({
      select: [
        'id',
        'fullName',
        'email',
        'title',
        'currentSalary',
        'startingDate',
        'isContractor',
        'departments',
        'picture',
        'hasLeft',
        'dateLeftOn',
        'deleteDate',
      ],
      where: {
        deleteDate: null,
        role: {
          id: Not(1),
        },
      },
      relations: [
        'departments',
        'currentSalary',
        'salaries',
        'leaves',
        'bonuses',
        'documents',
      ],
    });
  }

  async getEmployeeById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      select: [
        'id',
        'fullName',
        'email',
        'title',
        'currentSalary',
        'startingDate',
        'isContractor',
        'departments',
        'picture',
        'hasLeft',
        'dateLeftOn',
        'bonuses',
        'leaves',
        'leaveDaysLeft',
        'salaries',
        'documents',
        'projects',
        'currentProject',
        'deleteDate',
      ],
      where: {
        deleteDate: null,
        id: id,
      },
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
  }

  async getDepartmentsByIds(ids: number[]): Promise<Department[]> {
    return this.departmentsRepository.findByIds(ids);
  }

  async deleteUserByEmail(
    document: Express.Multer.File,
    deleteUserDto: DeleteUserDTO,
  ): Promise<User> {
    if (deleteUserDto.reason === '1')
      throw new HttpException(
        `Please select a valid reason`,
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.usersRepository.findOne({
      where: { email: deleteUserDto.email },
    });
    if (!user)
      throw new HttpException(
        `User with email: ${deleteUserDto.email} not found`,
        HttpStatus.BAD_REQUEST,
      );

    if (deleteUserDto.reason === '3') {
      if (!document)
        throw new HttpException(
          `Document for leaving employee must be uploaded`,
          HttpStatus.BAD_REQUEST,
        );

      await this.employeeDocumentService.createNewEmployeeDocument(document, {
        name: 'Leave Letter',
        user: user,
        document: document.buffer,
      });
      user.hasLeft = true;
      user.dateLeftOn = new Date();
      return await this.usersRepository.save(user);
    }

    return await this.softDeleteUser(user);
  }

  async softDeleteUser(user: User): Promise<User> {
    return await this.usersRepository.save({ ...user, deleteDate: new Date() });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role') // Eagerly load the role entity
      .where('user.email = :email', { email })
      .getOne();
  }

  async updateUserPicture(
    id: number,
    picture: Express.Multer.File,
  ): Promise<User> {
    if (!picture)
      throw new HttpException(
        'Employee Picture Must be Uploaded',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    const userWithPicture = { ...user, picture: picture?.buffer };

    Object.assign(user, userWithPicture);

    return await this.usersRepository.save(user);
  }

  async updateUser(id: number, updatedData: EditUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user)
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

    Object.assign(user, updatedData);

    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(
    createUserDTO: CreateUserDTO,
    picture: Express.Multer.File[],
    document: Express.Multer.File[],
  ): Promise<User> {
    try {
      if (!picture)
        throw new HttpException(
          'Employee Picture Must be Uploaded',
          HttpStatus.BAD_REQUEST,
        );
      if (!document)
        throw new HttpException(
          'Salary Document Must be Uploaded',
          HttpStatus.BAD_REQUEST,
        );

      const currentRole = createUserDTO.role.name;
      const roleExists = await this.roleService.findOne(currentRole);

      if (!roleExists)
        throw new HttpException('Invalid Role', HttpStatus.BAD_REQUEST);

      const isEmailUnique = await this.validateEmail(createUserDTO.email);
      if (!isEmailUnique)
        throw new HttpException(
          'Invalid Email or Password',
          HttpStatus.BAD_REQUEST,
        );

      const generatedPassword = generateRandomPassword();
      const userWithHashedPass = {
        ...createUserDTO,
        password: hashPass(generatedPassword),
      };

      const leaveLeft = getLeaveDaysLeft(createUserDTO.startingDate);

      const userWithPicture = {
        ...userWithHashedPass,
        isContractor: Boolean(createUserDTO.isContractor),
        picture: picture[0]?.buffer || null,
        leaveDaysLeft: leaveLeft,
      };

      const newUser = await this.usersRepository.save(userWithPicture);

      await this.salaryService.createNewSalary(document[0], {
        ...createUserDTO.salary,
        user: newUser,
      });

      return await this.emailService.generateEmail(
        createUserDTO.email,
        generatedPassword,
      );
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(register: registerDto): Promise<User> {
    try {
      const password = register.password;
      const isValidPassword = validatePassword(password);

      if (!isValidPassword) {
        throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
      }

      const usersCount = await this.usersRepository.count();

      if (usersCount === 0) {
        const userWithHashedPass = {
          ...register,
          password: hashPass(register.password),
          title: 'System Administrator',
          startingDate: new Date(),
          role: { id: 1, name: 'ADMIN' },
        };

        return await this.usersRepository.save(userWithHashedPass);
      }

      throw new HttpException(
        'Contact your administrator.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw error;
    }
  }

  private async validateEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email); // Return true if user is not found, indicating the email is unique
    if (user) return false;

    if (email.trim() === '') return false;

    if (email.length > 40) return false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;

    return true;
  }
}
