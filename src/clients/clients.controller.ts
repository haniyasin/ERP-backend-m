import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { UpdateClientDTO } from './dto/update-client.dto';
import { RolesName } from 'src/roles/constants';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() client: CreateClientDTO): Promise<Client> {
    return await this.clientsService.create(client);
  }

  @Delete()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  async deleteClientByName(@Body('name') name: string): Promise<string> {
    await this.clientsService.removeClient(name);
    return 'Client Deleted successfully';
  }

  @Put()
  @Roles(RolesName.ADMIN, RolesName.FIN)
  @UseGuards(RolesGuard)
  async editClient(@Body() ClientDTO: UpdateClientDTO): Promise<Client> {
    return await this.clientsService.updateClient(ClientDTO);
  }
}
