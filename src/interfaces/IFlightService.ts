import Flight from '../entities/Flight';

export interface IFlightService {
    createFlight(flightNumber: string, data: any): Promise<Flight>;
}
