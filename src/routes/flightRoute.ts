import express from "express";
import { AppDataSource } from '../lib/database';
import cacheMiddleware from "../middleware/cacheMiddleware"
import FlightController from "../controller/FlightController";
import FlightService from '../services/FlightService';
import FlightRepository from '../repository/FlightRepository';
import ReservationService from "../services/ReservationService";
import ReservationRepository from "../repository/ReservationRepository";

const flightRepository = new FlightRepository(AppDataSource);
const flightService = new FlightService(flightRepository);
const reservationRepository = new ReservationRepository(AppDataSource);
const reservationService = new ReservationService(reservationRepository);

const flightController = new FlightController(flightService, reservationService);

const router = express.Router();

router.get("/", flightController.index);

router.get("/flights", cacheMiddleware, flightController.getAllFlights);

router.get("/filter", flightController.filteredFlights);

router.get("/get-flight-history", flightController.getFlightHistory);

router.get("/filter/date", flightController.filterFlightsByDate);

router.get("/filter/direction", flightController.filterFlightsByDestination);

router.get("/reservation", cacheMiddleware, flightController.getAllReservations);

router.post("/reservation", flightController.addReservation);

router.get("/:id", flightController.getFlightDetail);

export default router;
