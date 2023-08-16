import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Role } from "./roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleDTO } from "./role.dto";

@Injectable()
export class RolesService{
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>
    ) {}

    findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    findOne(name: string): Promise<Role> {
        return this.rolesRepository.findOneBy({ name });
    }

    async addRole(role: RoleDTO): Promise<Role> {
        try {
            const roleName = role.name;
            const roleExists = await this.findOne(roleName);

            if(roleExists) {
                throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
            }

            return this.rolesRepository.save(role);
        } catch (error) {
            throw error;
        }
    }
}