import { IUser } from "../shared/types/type.js";
import { User } from "./user.model.js";

class UserRepository {
    async create(userData: IUser) {
        const createdUser = await User.create(userData);
        return createdUser;
    }

    async findUserById(id: string) {
        const user = await User.findById(id);
        return user;
    }

    async findUserByName(username: string) {
        const user = await User.findOne({ username });
        return user;
    }

    async findUserByEmail(email: string) {
        const user = await User.findOne({ email }).select("+password");
        return user;
    }
}

export const userRepository = new UserRepository();
