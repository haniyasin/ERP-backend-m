import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Technologies {
    @PrimaryColumn()
    id: number

    @Column()
    name: string
}