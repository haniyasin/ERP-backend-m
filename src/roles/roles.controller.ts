import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { RoleDTO } from './dto/role.dto';
import { Roles } from './roles.decorator';
import { RolesName } from './constants';
import { RolesGuard } from './roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @Roles(RolesName.ADMIN)
  @UseGuards(RolesGuard)
  async getAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Post('createRole')
  @Roles(RolesName.ADMIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async addRole(@Body() role: RoleDTO) {
    return this.rolesService.addRole(role);
  }
}
