import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { EditInvoiceDTO } from './dto/update-invoice.dto';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { paginateConfig } from './paginate-config';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(invoice: CreateInvoiceDTO): Promise<Invoice> {
    const { invoiceNumber } = invoice;
    const checkIfExists = await this.invoiceRepository.findOne({
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

  async findAll(query: PaginateQuery): Promise<Paginated<Invoice>> {
    return paginate(query, this.invoiceRepository, paginateConfig);
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async updateInvoice(id: number, editInvoiceDto: EditInvoiceDTO) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });

    if (!invoice)
      throw new HttpException(
        `Invoice with id: ${id} does not exist.`,
        HttpStatus.BAD_REQUEST,
      );

    return this.invoiceRepository.update({ id }, editInvoiceDto);
  }

  async delete(invoiceNumber: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { invoiceNumber },
    });

    if (!invoice)
      throw new HttpException('Invalid invoice', HttpStatus.BAD_REQUEST);

    return this.invoiceRepository.remove(invoice);
  }
}
