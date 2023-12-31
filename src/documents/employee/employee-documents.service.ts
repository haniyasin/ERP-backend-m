import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDocument } from './entities/employee-document.entity';
import { CreateEmployeeDocumentDTO } from './dtos/create-employee-document.dto';
import { User } from 'src/users/entities/user.entity';
import * as path from 'path';

@Injectable()
export class EmployeeDocumentService {
  constructor(
    @InjectRepository(EmployeeDocument)
    private employeeDocumentRepository: Repository<EmployeeDocument>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllEmployeeDocuments(userId: number): Promise<EmployeeDocument[]> {
    try {
      const documents = await this.employeeDocumentRepository.find({
        relations: ['user'],
      });
      return documents.filter((document) => document.user.id == userId);
    } catch (error) {
      throw new Error(`Error when fetching documents: ${error}`);
    }
  }

  async createNewEmployeeDocument(
    document: Express.Multer.File,
    createEmployeeDocumentDTO: CreateEmployeeDocumentDTO,
  ): Promise<EmployeeDocument> {
    if (!document)
      throw new HttpException('Document is Required!', HttpStatus.BAD_REQUEST);

    const id = createEmployeeDocumentDTO.user.id;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new Error(`User with id ${id} not found`);

    const fileExtension = path.extname(document.originalname).toLowerCase();

    const finishedEmployeeDocument = {
      ...createEmployeeDocumentDTO,
      user: user,
      document: document?.buffer,
      documentType: fileExtension,
      dateOfUpload: new Date(),
    };

    return await this.employeeDocumentRepository.save(finishedEmployeeDocument);
  }
}
