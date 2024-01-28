import * as bcrypt from "bcrypt"

export class Bcrypt {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash
    }

    static async comparePassword(password: string, userPassword: string): Promise<Boolean> {
        return await bcrypt.compare(password, userPassword)
    }
}