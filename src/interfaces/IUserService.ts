import User from '../entities/User';

export interface IUserService {
    createUser(name: string, email: string, password: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}