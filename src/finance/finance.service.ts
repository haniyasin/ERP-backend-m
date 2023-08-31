import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/createInvoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(invoice: CreateInvoiceDTO): Promise<Invoice> {
    const { invoiceNumber } = invoice;
    const checkIfExists = await this.invoiceRepository.find({
      where: { invoiceNumber },
    });
    if (checkIfExists) {
      throw new HttpException(
        'An invoice with this number already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.invoiceRepository.save(invoice);
    }
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.find();
    return invoices;
  }

  findOne(id: number) {
    return `This action returns a #${id} finance`;
  }

  // update(id: number, updateFinanceDto: UpdateFinanceDto) {
  //   return `This action updates a #${id} finance`;
  // }

  async delete(invoiceNumber: number): Promise<void> {
    const invoice = await this.invoiceRepository.findOne({
      where: { invoiceNumber },
    });
    if (!invoice)
      throw new HttpException('Invalid invoice', HttpStatus.BAD_REQUEST);
    await this.invoiceRepository.remove(invoice); //might be an error
  }
}
