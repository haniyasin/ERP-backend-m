import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { PaymentType, PaymentMethod } from '../enums';

export class CreateInvoiceDTO {
  @IsNotEmpty()
  invoiceNumber: string;

  @IsDateString({}, { message: 'Created at should be a valid date' })
  createdAt: Date;

  @IsEnum(PaymentType, { message: 'Invalid payment type' })
  paymentType: PaymentType;

  @IsNotEmpty({ message: 'Category should not be empty' })
  category: string;

  @IsNotEmpty({ message: 'Client should not be empty!' })
  client: string;

  @IsNotEmpty({ message: 'Leave a note!' })
  notes: string;

  @IsNotEmpty({ message: 'Currency should not be empty' })
  currency: string;

  @IsNumber({}, { message: 'Amount with vat must be a valid number' })
  // @Validate((value) => /^-?\d+(\.\d{2})$/.test(value.toString()), {
  // message: 'amountWithVat Invalid format! Must be a number with exactly two decimal places!',})
  //THERE SHOULD BE A VALIDATAION FOR THE 2 places after the comma
  // @IsDecimal({ decimal_digits: '1,3' }, { message: 'Amount with vat must be a valid number' })
  amountWithVat: number;

  @IsNumber({}, { message: 'The amount without vat must be a number' })
  //@Validate((value) => /^\d+(\.\d{2})$/.test(value), {
  //message: 'Amount with no vat must be a number with exactly two decimal places!',})
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
