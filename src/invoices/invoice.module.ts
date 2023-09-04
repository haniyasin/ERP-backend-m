import { Module } from '@nestjs/common';
import { FinanceService } from './invoice.service';
import { FinanceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
