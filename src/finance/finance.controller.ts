import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateInvoiceDTO } from './dto/createInvoice.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Invoice } from './entities/invoice.entity';
import { Public } from 'src/decorators/public.decorator';
import { RolesName } from 'src/roles/constants';

@Controller('invoices')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.financeService.findAll();
  }

  @Post('createInvoice')
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() invoice: CreateInvoiceDTO): Promise<Invoice> {
    return await this.financeService.create(invoice);
  }

  @Delete('deleteInvoice')
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  async delete(@Body() body: { invoiceNumber: string }): Promise<string> {
    await this.financeService.delete(body.invoiceNumber);
    return 'Successfully deleted invoice';
  }

  // @Put('updateInvoice/:id')
  // @Roles(RolesName.ADMIN, RolesName.HR)
  // @UseGuards(RolesGuard)
  // @UsePipes(new ValidationPipe())
  // async editUser(@Param('id') id: number, @Body() editUserDto: EditUserDTO): Promise<User> {
  //     return await this.usersService.updateUser(id, editUserDto);
  // }
}
