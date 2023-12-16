import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsDate } from 'class-validator';
import User from './User';

export enum ReservationStatus {
    Confirmed = "confirmed",
    Cancelled = "cancelled",
    Pending = "pending"
}

@Entity()
export default class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.reservations)
    user!: User;

    @Column({
        type: "enum",
        enum: ReservationStatus,
        default: ReservationStatus.Pending
    })
    status!: ReservationStatus;

    @Column({ nullable: true })
    seatNumber?: string;

    @Column()
    @IsNotEmpty()
    flightNumber!: string;

    @Column()
    @IsDate()
    scheduleDateTime!: Date;

    @CreateDateColumn()
    createdAt!: Date;
}
