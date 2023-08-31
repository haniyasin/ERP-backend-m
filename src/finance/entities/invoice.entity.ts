import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentType, PaymentMethod } from '../enums';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceNumber: number;

  @CreateDateColumn({ type: 'date' }) //, default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column()
  client: string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  currency: string;

  @Column({ scale: 2 }) //2 digits after decimal point
  amountWithVat: number;

  @Column({ scale: 2 })
  amountWithoutVat: number;

  @Column()
  vat: number;

  @CreateDateColumn({ type: 'date' })
  dueDate: Date;

  @CreateDateColumn({ type: 'date' })
  paymentMadeOn: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
}
