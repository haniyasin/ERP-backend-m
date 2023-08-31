import { Candidate } from "src/candidates/entities/candidate.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    project: string;

    @Column()
    description: string;

    @OneToMany(() => Candidate, candidate => candidate.position)
    candidates: Candidate[];
}
