import { User } from "./user.model.js";

export const fetchAssigneeByUsername = async (username: string) => {
    const assignee = await User.findOne({ username });
    return assignee;
};
