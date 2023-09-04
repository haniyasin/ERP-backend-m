import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { FinanceService } from './invoice.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Invoice } from './entities/invoice.entity';
import { RolesName } from 'src/roles/constants';
import { EditInvoiceDTO } from './dto/update-invoice.dto';
import { UpdateResult } from 'typeorm';

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

  @Post()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() invoice: CreateInvoiceDTO): Promise<Invoice> {
    return this.financeService.create(invoice);
  }

  @Delete()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  delete(@Body() body: { invoiceNumber: string }): Promise<Invoice> {
    return this.financeService.delete(body.invoiceNumber);
  }

  @Put(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  editUser(
    @Param('id') id: number,
    @Body() editInvoiceDto: EditInvoiceDTO,
  ): Promise<UpdateResult> {
    return this.financeService.updateInvoice(id, editInvoiceDto);
  }
}