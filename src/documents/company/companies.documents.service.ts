import { Injectable } from "@nestjs/common";
import { CompaniesDocuments } from "./companies.documents.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CompaniesDocumentsDTO } from "./companies.documents.dto";

@Injectable()
export class CompaniesDocumentsService {
    constructor(
        @InjectRepository(CompaniesDocuments)
        private companiesDocumentsRepository: Repository<CompaniesDocuments>
    ) {}

    async addDoc(companiesDocumentsDTO: CompaniesDocumentsDTO, document: Express.Multer.File): Promise <CompaniesDocuments> {
        const currentDoc = {...companiesDocumentsDTO, document: document?.buffer};
        return await this.companiesDocumentsRepository.save(currentDoc);
    }

    async getDoc(id: number): Promise<CompaniesDocuments> {
        return await this.companiesDocumentsRepository.findOne({ where: { id } });
      }
}