import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfUpload: Date;

  @Column()
  documentType: string;

  @Column({ nullable: true, type: 'bytea' })
  document: Buffer;
}
