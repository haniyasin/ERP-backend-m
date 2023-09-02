import { Module } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
