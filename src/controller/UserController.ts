import { Request, Response } from 'express';
import { IUserService } from '../interfaces/IUserService';
import redisClient from '../lib/redisClient';

export default class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public register = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body;
        try {
            const user = await this.userService.createUser(name, email, password);
            res.status(201).json(user);

            await redisClient.del("express_cache_GET_/user/all");
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public index = (req: Request, res: Response): void => {
        res.send("user working");
    };

    private handleError(res: Response, error: unknown): void {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong." });
        }
    }
}

