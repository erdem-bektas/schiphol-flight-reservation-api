import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export default class Flight {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @IsNotEmpty()
    @IsString()
    flightNumber!: string;

    @Column('json')
    @IsJSON()
    data!: any;
}
