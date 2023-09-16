import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDTO } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { Repository } from 'typeorm';
import { EditReportDTO } from './dto/edit-report.dto';
import * as path from 'path';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { paginateConfig } from './paginate-config';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private reportRepository: Repository<Reports>,
  ) {}

  async create(
    document: Express.Multer.File,
    createReportDto: CreateReportDTO,
  ): Promise<Reports> {
    if (!document)
      throw new HttpException('Document is Required!', HttpStatus.BAD_REQUEST);

    const { name } = createReportDto;
    const checkIfExists = await this.reportRepository.findOne({
      where: { name },
    });

    if (checkIfExists)
      throw new HttpException(
        'A report with this name already exists',
        HttpStatus.BAD_REQUEST,
      );

    const fileExtension = path.extname(document.originalname).toLowerCase();

    const finishedEmployeeDocument = {
      ...createReportDto,
      document: document?.buffer,
      documentType: fileExtension,
      dateOfUpload: new Date(),
    };

    return this.reportRepository.save(finishedEmployeeDocument);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Reports>> {
    return paginate(query, this.reportRepository, paginateConfig);
  }

  findOne(id: number) {
    return this.reportRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async delete(id: number): Promise<Reports> {
    const report = await this.reportRepository.findOne({
      where: { id },
    });

    if (!report)
      throw new HttpException('Invalid report', HttpStatus.BAD_REQUEST);

    return this.reportRepository.remove(report);
  }

  async updateReport(id: number, editReportDto: EditReportDTO) {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report)
      throw new HttpException(
        `Report with id: ${id} does not exist.`,
        HttpStatus.BAD_REQUEST,
      );

    return this.reportRepository.update({ id }, editReportDto);
  }
}
