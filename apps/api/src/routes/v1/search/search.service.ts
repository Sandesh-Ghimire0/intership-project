import { Task } from "../task/task.model.js";
import { User } from "../user/user.model.js";

export const searchTaskByQuery = async (q: string) => {
    const searchRegex = new RegExp(q, "i");

    const matchingUsers = await User.find({ username: searchRegex }).select(
        "_id",
    );
    const userIds = matchingUsers.map((u: any) => u._id);

    // 2. Query and Populate
    const tasks = await Task.find({
        $or: [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            { assignees: { $in: userIds } },
            { reporter: { $in: userIds } },
        ],
    })
        .populate("assignees", "username")
        .populate("reporter", "username")
        .sort({ createdAt: -1 });

    return tasks;
};
