import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompaniesDocuments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  dateOfUpload: Date;

  @Column({ nullable: true })
  documentType: string;

  @Column({ nullable: true, type: 'bytea' })
  document: Buffer;

  @ManyToOne(() => Company, (company) => company.documents)
  company: Company;
}
