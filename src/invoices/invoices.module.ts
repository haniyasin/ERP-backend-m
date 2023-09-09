import { Module } from '@nestjs/common';
import { FinanceService } from './invoices.service';
import { FinanceController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
