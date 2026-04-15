import { User } from "./user.model.js";
import { userRepository } from "./user.repository.js";

export const fetchAssigneeByUsername = async (username: string) => {
    const assignee = await User.findOne({ username });
    return assignee;
};

export const fetchUserByName = async (username: string) => {
    const users = userRepository.findAllUsername(username)
    return users
}