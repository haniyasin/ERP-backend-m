import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDocument } from './entities/employee-document.entity';
import { EmployeeDocumentService } from './employee-documents.service';
import { EmployeeDocumentController } from './employee-documents.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeDocument, User])],
  providers: [EmployeeDocumentService],
  controllers: [EmployeeDocumentController],
})
export class EmployeeDocumentModule {}
