import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { IsEmail, Length, IsDate, IsOptional, IsPhoneNumber } from 'class-validator';
import PasswordHasher from '../helpers/PasswordHasher';
import Reservation from './Reservation';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: 'user' })
    role!: string;

    @Column()
    @Length(1, 50)
    name!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column()
    @Length(8, 50)
    password!: string;

    @Column({ nullable: true })
    @IsPhoneNumber()
    phoneNumber?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsDate()
    birthDate?: Date;

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations!: Reservation[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await PasswordHasher.hashPassword(this.password);
    }
}
