import axios from 'axios';
import config from '../config/configs';
import Flight from '../entities/Flight';
import { IFlightService } from '../interfaces/IFlightService';
import FlightRepository from '../repository/FlightRepository';

export default class FlightService implements IFlightService {
    private flightRepository: FlightRepository;

    constructor(FlightRepository: FlightRepository) {
        this.flightRepository = FlightRepository;
    }

    filterFlights(flights: any[], date: string, direction: string): Flight[] {
        return flights.filter(flight => {
            return flight.scheduleDate === date && flight.route.destinations[0] === direction;
        });
    }

    async createFlight(flightNumber: string, data: JSON): Promise<Flight> {
        return this.flightRepository.createFlight(flightNumber, data);
    }

    private async fetchData(url: string) {
        const headers = {
            'Accept': 'application/json',
            'app_id': `${config.APPLICATION_ID}`,
            'app_key': `${config.APPLICATION_KEY}`,
            'ResourceVersion': 'v4'
        };

        try {
            const response = await axios.get(url, { headers: headers });
            return response.data;
        } catch (error) {
            console.error('Axios request failed:', error);
            throw new Error('Server Error');
        }
    }

    async getFlightDetail(id: string) {
        const url = `https://api.schiphol.nl/public-flights/flights/${id}`;
        return this.fetchData(url);
    }

    async getAllFlights() {
        const url = "https://api.schiphol.nl/public-flights/flights";
        return this.fetchData(url);
    }

    async filterFlightsByDate(flights: any[], date: string) {
        return flights.filter(flight => flight.scheduleDate === date);
    }

    async filterFlightsByDestination(flights: any[], destination: string) {
        return flights.filter(flight => flight.route.destinations.includes(destination));
    }
}
