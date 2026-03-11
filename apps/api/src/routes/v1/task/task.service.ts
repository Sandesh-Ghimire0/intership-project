import { ITask } from "../shared/types/type.js";
import { User } from "../user/user.model.js";
import { taskrepository } from "./task.repository.js";

class TaskService {
    async createNewTask(data: ITask) {
        const assigneesId = data.assignees.map((a: any) => a._id);

        let reporterObj: any = null;
        if (typeof data.reporter === "string") {
            reporterObj = await User.findOne({ username: data.reporter });
        }
        const reporterId = reporterObj?._id;

        const createdTask = await taskrepository.create({
            ...data,
            assignees: assigneesId,
            reporter: reporterId,
        });

        return createdTask;
    }

    async fetchAllTask() {
        const tasks = await taskrepository.findAll();
        return tasks;
    }

    async updateTaskById(data: ITask, id: string) {
        const assignees = data.assignees;
        const assigneesId = assignees.map((a: any) => a._id);

        // const reporterId = reporter._id;

        data.assignees = assigneesId;
        // data.reporter = reporterId;

        const updatedTask = await taskrepository.update(data, id);

        return updatedTask;
    }

    async deleteTaskById(id: string) {
        const deletedTask = await taskrepository.delete(id);
        return deletedTask;
    }
}

export const taskService = new TaskService();
