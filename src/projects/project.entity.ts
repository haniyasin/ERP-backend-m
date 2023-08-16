// import { Company } from "src/companies/company.entity";
// import { Position } from "src/positions/position.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    openPositions: number;

    // @OneToMany(() => Position, position => position.project)
    // positions: Position[];

    // @ManyToOne(() => Company, company => company.projects)
    // company: Company;

    @ManyToMany(() => User, user => user.projects)
    users: User[];
}