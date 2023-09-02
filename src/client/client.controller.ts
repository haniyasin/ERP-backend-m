import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ClientsService } from './client.service';
import { Public } from 'src/decorators/public.decorator';
import { CreateClientDTO } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { UpdateClientDTO } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Public()
  @Get()
  async getAll(): Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @Public()
  @Post()
  async create(@Body() client: CreateClientDTO): Promise<Client> {
    return await this.clientsService.create(client);
  }

  @Delete()
  async deleteClientByName(@Body('name') name: string): Promise<string> {
    await this.clientsService.removeClient(name);
    return 'Client Deleted successfully';
  }

  @Put()
  async editClient(@Body() ClientDTO: UpdateClientDTO): Promise<Client> {
    return await this.clientsService.updateClient(ClientDTO);
  }
}
