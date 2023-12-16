import express from "express";
import { AppDataSource } from '../lib/database';
import cacheMiddleware from "../middleware/cacheMiddleware"
import UserController from "../controller/UserController";
import UserService from "../services/userService";
import UserRepository from "../repository/userRepository";

const router = express.Router();

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

const userController = new UserController(userService);

/* GET index page. */
router.get("/", userController.index);

router.get("/all", cacheMiddleware, userController.getAllUsers);

router.post("/register", userController.register);

export default router;
