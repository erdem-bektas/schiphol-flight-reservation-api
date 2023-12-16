import Reservation from '../entities/Reservation';
import User from '../entities/User';

export interface IReservationService {
    createReservation(user: User, flightNumber: string, flightDetail: any, seatNumber: string): Promise<Reservation>;
    findReservationById(id: number): Promise<Reservation | null>;
    findReservationsByUser(user: User): Promise<Reservation[]>;
    findReservationsByFlightNumber(flightNumber: string): Promise<Reservation[]>;
    getAllReservations(): Promise<Reservation[]>;
}