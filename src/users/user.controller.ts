import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  Bind,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDTO } from './dto/create.user.dto';
import { RolesName } from 'src/roles/constants';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from './user.entity';
import { EditUserDTO } from './dto/edit.user.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { jwtConstants } from 'src/auth/constants';
import * as jwt from 'jsonwebtoken';
import { DeleteUserDTO } from './dto/delete.user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async getAllUsers(): Promise<User[] | null> {
    return await this.usersService.getAll();
  }

  @Get('userById/:id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async getEmployeeById(@Param() user: { id: number }): Promise<User> {
    return await this.usersService.getEmployeeById(user.id);
  }

  @Get('loggedInUser')
  async getLoggedInUser(@Req() request: Request): Promise<User> {
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const decodedToken = jwt.verify(token, jwtConstants.secret);
      const userId = decodedToken['sub'];

      if (!userId)
        throw new HttpException(
          'Invalid or Missing token',
          HttpStatus.BAD_REQUEST,
        );
      return await this.usersService.getEmployeeById(Number(userId));
    } catch {
      throw new HttpException(
        'Invalid or Missing token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async editUser(
    @Param('id') id: number,
    @Body() editUserDto: EditUserDTO,
  ): Promise<User> {
    return await this.usersService.updateUser(id, editUserDto);
  }

  @Put('/picture/:id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('picture'))
  @Bind(UploadedFile())
  async changeUserPicture(
    @UploadedFile() picture: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<User> {
    return await this.usersService.updateUserPicture(id, picture);
  }

  @Put()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  async deleteUser(
    @UploadedFile() document: Express.Multer.File,
    @Body() deleteUserDto: DeleteUserDTO,
  ): Promise<User> {
    return await this.usersService.deleteUserByEmail(document, deleteUserDto);
  }

  @Post('createUser')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'document', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      document?: Express.Multer.File[];
    },
    @Body() createUserDto: CreateUserDTO,
  ): Promise<User> {
    return await this.usersService.create(
      createUserDto,
      files.picture,
      files.document,
    );
  }

  @Public()
  @Get('isDBEmpty')
  async isDBEmpty(): Promise<boolean> {
    return await this.usersService.checkIsDBEmpty();
  }
}
