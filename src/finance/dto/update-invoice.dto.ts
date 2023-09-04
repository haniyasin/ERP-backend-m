import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PaymentType, PaymentMethod } from '../enums';
import { Client } from 'src/client/entities/client.entity';

export class EditInvoiceDTO {
  @IsNotEmpty()
  invoiceNumber: string;

  @IsDateString({}, { message: 'Created at should be a valid date' })
  createdAt: Date;

  @IsEnum(PaymentType, { message: 'Invalid payment type' })
  paymentType: PaymentType;

  @IsNotEmpty({ message: 'Category should not be empty' })
  category: string;

  @IsNotEmpty({ message: 'Client should not be empty!' })
  client: Client;

  @IsNotEmpty({ message: 'Please Leave a note!' })
  notes: string;

  @IsNotEmpty({ message: 'Currency should not be empty' })
  currency: string;

  @IsNumber({}, { message: 'Amount with vat must be a valid number' })
  amountWithVat: number;

  @IsNumber({}, { message: 'The amount without vat must be a number' })
  amountWithoutVat: number;

  @IsNotEmpty({ message: 'Vat should not be empty' })
  @IsNumber()
  vat: number;

  @IsDateString({}, { message: 'Due date should be a valid date' })
  dueDate: Date;

  @IsDateString({}, { message: 'Payment made on should be a valid date' })
  paymentMadeOn: Date;

  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  paymentMethod: PaymentMethod;
}
