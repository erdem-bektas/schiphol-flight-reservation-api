import ReservationRepository from '../repository/ReservationRepository';
import { IReservationService } from '../interfaces/IReservationService';
import Reservation from '../entities/Reservation';
import User from '../entities/User';

export default class ReservationService implements IReservationService {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async getAllReservations(): Promise<Reservation[]> {
        return this.reservationRepository.getAllReservation();
    }

    async findReservationById(id: number): Promise<Reservation | null> {
        return this.reservationRepository.findReservationById(id);
    }

    findReservationsByUser(user: User): Promise<Reservation[]> {
        return this.reservationRepository.findReservationsByUser(user);
    }

    findReservationsByFlightNumber(flightNumber: string): Promise<Reservation[]> {
        return this.reservationRepository.findReservationsByFlightNumber(flightNumber);
    }

    async createReservation(user: User, flightNumber: string, flightDetail: any, seatNumber: string): Promise<Reservation> {
        const existingReservation = await this.reservationRepository.findReservationByFlightAndSeat(flightNumber, seatNumber);
        if (existingReservation) {
            throw new Error(`Seat number ${seatNumber} on flight ${flightNumber} is already booked.`);
        }

        return this.reservationRepository.createReservation(user, flightNumber, flightDetail, seatNumber);
    }

}
