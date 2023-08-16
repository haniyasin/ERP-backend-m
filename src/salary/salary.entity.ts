import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  gross: number;

  @Column()
  net: number
  
  @Column({ nullable: true, type: 'bytea' })
  document: Buffer;

  @ManyToOne(() => User, user => user.salaries)
  user: User;
}