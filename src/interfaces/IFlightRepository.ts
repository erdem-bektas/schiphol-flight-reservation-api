import Flight from '../entities/Flight';

export interface IFlightService {
    createFlight(flightNumber: string, data: JSON): Promise<Flight>;
    getAllFlights(): unknown;
}
