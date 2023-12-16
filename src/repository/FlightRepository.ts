import { Repository, DataSource } from 'typeorm';
import Flight from '../entities/Flight';
import { IFlightService } from 'src/interfaces/IFlightService';

export default class FlightService implements IFlightService {
    private repository: Repository<Flight>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Flight);
    }
    async createFlight(flightNumber: string, data: JSON): Promise<Flight> {
        const existingflightNumber = await this.repository.findOne({ where: { flightNumber } });
        if (existingflightNumber) {
            return existingflightNumber;
        }

        const flight = this.repository.create({ flightNumber, data });
        await this.repository.save(flight);
        return flight;
    }

}
