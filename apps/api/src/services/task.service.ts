import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createNewTask = async (data: any) => {
    const {
        title,
        description,
        status,
        priority,
        dueDate,
        assignees,
        reporter,
    } = data;

    const assigneesId = assignees.map((a: any) => a._id);

    const reporterObj = await User.findOne({ username: reporter });
    const reporterId = reporterObj?._id;

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        assignees: assigneesId,
        reporter: reporterId,
    });

    const createdTask = await Task.findById(task._id)
        .populate("assignees")
        .populate("reporter");

    return createdTask;
};

export const fetchAllTask = async () => {
    const tasks = await Task.find().populate("assignees").populate("reporter");
    return tasks;
};

export const deleteTaskById = async (id: string) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
};

export const updateTaskById = async (data: any, id: string) => {
    const { assignees, reporter } = data;
    const assigneesId = assignees.map((a: any) => a._id);

    const reporterId = reporter._id;

    data.assignees = assigneesId;
    data.reporter = reporterId;

    const updatedTask = await Task.findByIdAndUpdate(id, data, {
        new: true, // return updated document
        runValidators: true, // validate against the model schema
    })
        .populate("assignees")
        .populate("reporter");

    return updatedTask;
};
