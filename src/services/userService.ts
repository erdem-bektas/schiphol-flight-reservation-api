import UserRepository from '../repository/userRepository';
import { IUserService } from '../interfaces/IUserService';
import User from '../entities/User';

export default class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        return this.userRepository.createUser(name, email, password);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

}
