import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export type LeaveType = "Sick" | "Paid" | "Unpaid" | "Parental"

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({type: "enum", enum: ["Sick", "Paid", "Unpaid", "Parental"]})
  type: LeaveType;  
  
  @Column({ nullable: true, type: 'bytea' })
  document: Buffer;

  @ManyToOne(() => User, user => user.leaves)
  user: User;
}