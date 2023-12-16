import { Request, Response } from 'express';
import FlightService from '../services/FlightService';
import { IReservationService } from '../interfaces/IReservationService';
import User from '../entities/User';
import redisClient from '../lib/redisClient';

export default class FlightController {
    private flightService: FlightService;
    private reservationService: IReservationService;

    constructor(flightService: FlightService, reservationService: IReservationService) {
        this.flightService = flightService;
        this.reservationService = reservationService;

        this.getAllFlights = this.getAllFlights.bind(this);
        this.filterFlightsByDate = this.filterFlightsByDate.bind(this);
        this.getFlightDetail = this.getFlightDetail.bind(this);
        this.filteredFlights = this.filteredFlights.bind(this);
        this.filterFlightsByDestination = this.filterFlightsByDestination.bind(this);
        this.getAllReservations = this.getAllReservations.bind(this);
        this.addReservation = this.addReservation.bind(this);
        this.getFlightHistory = this.getFlightHistory.bind(this);
    }

    async getFlightHistory(req: Request, res: Response) {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send("Missing required parameter: userId");
        }

        try {
            const user = new User();
            user.id = userId;

            const reservations = await this.reservationService.findReservationsByUser(user);
            res.json(reservations);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async getAllReservations(req: Request, res: Response) {
        try {
            const users = await this.reservationService.getAllReservations();
            res.json(users);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async addReservation(req: Request, res: Response) {
        const { flightNumber, seatNumber, userId } = req.body;

        if (!flightNumber || !seatNumber || !userId) {
            return res.status(400).send("Missing required parameters: flightNumber, seatNumber, and userId");
        }

        try {
            const flightDetail = await this.flightService.getFlightDetail(flightNumber);
            if (!flightDetail) {
                return res.status(404).send("Flight not found");
            }

            await redisClient.del("express_cache_GET_/flight/reservation");

            const flight = await this.flightService.createFlight(flightNumber, flightDetail);

            const user = new User();
            user.id = userId;

            const reservation = await this.reservationService.createReservation(user, flightNumber, flightDetail, seatNumber);

            res.status(201).json({ message: "Reservation successful", reservationId: reservation.id });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async filterFlightsByDate(req: Request, res: Response) {
        try {
            const { date } = req.query;
            if (!date) {
                return res.status(400).send("Missing required query parameter: date");
            }

            const allFlights = await this.flightService.getAllFlights();
            const filteredFlights = await this.flightService.filterFlightsByDate(allFlights.flights, date as string);
            res.json(filteredFlights);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async filterFlightsByDestination(req: Request, res: Response) {
        try {
            const { direction } = req.query;
            if (!direction) {
                return res.status(400).send("Missing required query parameter: destination");
            }

            const allFlights = await this.flightService.getAllFlights();
            const filteredFlights = await this.flightService.filterFlightsByDestination(allFlights.flights, direction as string);
            res.json(filteredFlights);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async filteredFlights(req: Request, res: Response) {
        try {
            const { date, direction } = req.query;
            if (!date || !direction) {
                return res.status(400).send("Missing required query parameters: date and direction");
            }

            const allFlights = await this.flightService.getAllFlights();
            const filteredFlights = await this.flightService.filterFlights(allFlights.flights, date as string, direction as string);
            res.json(filteredFlights);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async getFlightDetail(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = await this.flightService.getFlightDetail(id);
            res.send(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    async getAllFlights(req: Request, res: Response) {
        try {
            const data = await this.flightService.getAllFlights();
            res.send(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    }

    index(req: Request, res: Response) {
        res.json({
            data: null,
            message: "flights working"
        });
    }
}
