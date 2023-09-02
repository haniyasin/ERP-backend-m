import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDTO } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(client: CreateClientDTO): Promise<Client> {
    return await this.clientRepository.save(client);
  }

  async getAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async getOne(name: string): Promise<Client> {
    return await this.clientRepository.findOne({ where: { name } });
  }

  async removeClient(name: string): Promise<void> {
    const client = await this.getOne(name);
    if (!client) throw new Error(`Client with name ${name} not found`);
    await this.clientRepository.remove(client);
  }

  async updateClient(updatedData: UpdateClientDTO): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { name: updatedData.name },
    });

    if (!client)
      throw new Error(`Client with name ${updatedData.name} not found`);

    Object.assign(client, updatedData);

    return await this.clientRepository.save(client);
  }
}
