import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

export const createNewUser = async (data: any) => {
    const { username, email, password, role, description } = data;
    if (!username || !email || !password || !role) {
        throw new ApiError(
            400,
            "username, email, password and role is required",
        );
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new ApiError(400, "username already exist");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(400, "email already exist");
    }

    const createdUser = await User.create({
        username,
        email,
        password,
        role,
        description,
    });

    return createdUser;
};

export const fetchAssigneeByUsername = async (username: string) => {
    const assignee = await User.findOne({ username });
    return assignee;
};
