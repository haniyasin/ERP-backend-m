import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';
import { Public } from 'src/decorators/public.decorator';
import { RoleDTO } from './dto/role.dto';
import { Request } from 'express';
import { Roles } from './roles.decorator';
import { RolesName } from './constants';
import { RolesGuard } from './roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Roles(RolesName.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll(@Req() request: Request): Promise<Role[]> {
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
