import { DataSource, In, Repository } from 'typeorm';
import Reservation, { ReservationStatus } from '../entities/Reservation';
import User from '../entities/User';
import { IReservationRepository } from '../interfaces/IReservationRepository';

export default class ReservationRepository implements IReservationRepository {
    private reservationRepository: Repository<Reservation>;

    constructor(private dataSource: DataSource) {
        this.reservationRepository = dataSource.getRepository(Reservation);
    }

    async createReservation(user: User, flightNumber: string, flightDetail: any, seatNumber: string): Promise<Reservation> {
        const reservation = new Reservation();
        reservation.user = user;
        reservation.flightNumber = flightNumber;
        reservation.scheduleDateTime = new Date(flightDetail.scheduleDateTime);
        reservation.seatNumber = seatNumber;
        reservation.status = ReservationStatus.Pending;

        return this.reservationRepository.save(reservation);
    }

    async getAllReservation(): Promise<Reservation[]> {
        return this.reservationRepository.find();
    }

    async findReservationById(id: number): Promise<Reservation | null> {
        return this.reservationRepository.findOneBy({ id });
    }

    async findReservationsByUser(user: User): Promise<Reservation[]> {
        return this.reservationRepository.findBy({ user: { id: user.id } });
    }

    async findReservationsByFlightNumber(flightNumber: string): Promise<Reservation[]> {
        return this.reservationRepository.findBy({ flightNumber });
    }

    async findReservationByFlightAndSeat(flightNumber: string, seatNumber: string): Promise<Reservation | null> {
        const existingReservation = await this.reservationRepository.findOne({
            where: {
                flightNumber,
                seatNumber,
                status: In(['pending', 'confirmed'])
            }
        });

        return existingReservation;
    }

}
