import { IUser } from "../shared/types/type.js";
import { ApiError } from "../shared/utils/apiError.js";
import { User } from "../user/user.model.js";
import { userRepository } from "../user/user.repository.js";

class AuthService {
    async createNewUser(data: IUser) {
        const { username, email, password, role, description } = data;
        if (!username || !email || !password || !role) {
            throw new ApiError(
                400,
                "username, email, password and role is required",
            );
        }

        const existingUsername = await userRepository.findUserByName(username);
        if (existingUsername) {
            throw new ApiError(400, "username already exist");
        }

        const existingEmail = await userRepository.findUserByEmail(email);
        if (existingEmail) {
            throw new ApiError(400, "email already exist");
        }

        const createdUser = await userRepository.create(data);

        return createdUser;
    }

    async verifyUser(data: { email: string; password: string }) {
        const { email, password } = data;

        if (!email || !password) {
            throw new ApiError(400, "Email and Password are required");
        }

        const user = (await userRepository.findUserByEmail(email)) as any;
        if (!user) {
            throw new ApiError(400, "email not found");
        }

        const isCorrect = await user.isPasswordCorrect(password);
        if (!isCorrect) {
            throw new ApiError(400, "Incorrect password");
        }

        const accessToken = user.generateAccessToken();

        // delete does not work on mongoose document
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.refreshToken;

        return { user: userResponse, accessToken };
    }
}

export const authService = new AuthService();
