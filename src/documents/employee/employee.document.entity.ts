import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmployeeDocument {
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

  @ManyToOne(() => User, (user) => user.documents)
  user: User;
}
