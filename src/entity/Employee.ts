import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    companyId: string

    @Column('boolean', {default: false})
    reviewed: boolean = false;

}
