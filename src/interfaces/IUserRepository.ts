import User from '../entities/User';

export interface IUserRepository {
    createUser(name: string, email: string, password: string): Promise<User>;
    getAllUsers(): unknown;
}
