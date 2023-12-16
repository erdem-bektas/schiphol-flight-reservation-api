import { Repository, DataSource } from 'typeorm';
import User from '../entities/User';
import { IUserService } from 'src/interfaces/IUserService';

export default class UserService implements IUserService {
    private repository: Repository<User>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const existingUser = await this.repository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('The email address is already in use.');
        }

        const user = this.repository.create({ name, email, password });
        await this.repository.save(user);
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.repository.find();
    }

}
