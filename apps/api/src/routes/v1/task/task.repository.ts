import { ITask } from "../shared/types/type.js";
import { Task } from "./task.model.js";

class TaskRepository {
    async create(taskData: ITask) {
        const task = await Task.create(taskData);
        const createdTask = await this.findById(task._id);
        return createdTask;
    }

    async findAll() {
        const tasks = await Task.find()
            .populate("assignees")
            .populate("reporter");

        return tasks;
    }

    async findById(id: string) {
        const task = await Task.findById(id)
            .populate("assignees")
            .populate("reporter");

        return task;
    }

    async update(data: ITask, id: string) {
        const updatedTask = await Task.findByIdAndUpdate(id, data, {
            new: true, // return updated document
            runValidators: true, // validate against the model schema
        })
            .populate("assignees")
            .populate("reporter");

        return updatedTask;
    }

    async delete(id: string) {
        return await Task.findByIdAndDelete(id);
    }
}

export const taskrepository = new TaskRepository();
