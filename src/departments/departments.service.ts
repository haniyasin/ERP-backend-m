import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./departments.entity";
import { Repository } from "typeorm";

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private departmentsRepository:Repository<Department>
    ) {}

    findOne(id: number): Promise<Department | null> {
        return this.departmentsRepository.findOneBy({ id });
      }

    findAll(): Promise<Department[]> {
      return this.departmentsRepository.find();
    }
}