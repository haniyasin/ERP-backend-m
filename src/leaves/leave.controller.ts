import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesName } from 'src/roles/constants';
import { LeaveService } from './leave.service';
import { Leave } from './entities/leave.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateLeaveDTO } from './dto/create-leave.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('leaves')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async getAll(@Param() user: { id: number }): Promise<Leave[] | null> {
    return await this.leaveService.getAllLeaves(user.id);
  }

  @Post()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  async createLeave(
    @Param() document: Express.Multer.File,
    @Body() createLeaveDto: CreateLeaveDTO,
  ): Promise<Leave> {
    return await this.leaveService.createNewLeave(document, createLeaveDto);
  }
}
