import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentType, PaymentMethod } from '../enums';
import { Client } from 'src/clients/entities/client.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceNumber: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column()
  category: string;

  @ManyToOne(() => Client)
  client: Client;

  @Column({ nullable: true })
  notes: string;

  @Column()
  currency: string;

  @Column({ scale: 2 })
  amountWithVat: number;

  @Column({ scale: 2 })
  amountWithoutVat: number;

  @Column()
  vat: number;

  @CreateDateColumn({ type: 'date' })
  dueDate: Date;

  @CreateDateColumn({ nullable: true, type: 'date' })
  paymentMadeOn: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
}
