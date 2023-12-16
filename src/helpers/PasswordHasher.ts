import * as bcrypt from 'bcrypt';

export default class PasswordHasher {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}
