import dotenv from "dotenv";
dotenv.config();

import { ITask } from "../shared/types/type.js";
import { userRepository } from "../user/user.repository.js";
import { taskrepository } from "./task.repository.js";

import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat, zodTextFormat } from "openai/helpers/zod";
import { ApiError } from "../shared/utils/apiError.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const assigneeSchema = z.object({
    selectedUserId: z
        .array(z.string())
        .describe("Array of Id of the best fit users"),
});

class TaskService {
    async createNewTask(data: ITask) {
        const assigneesId = data.assignees.map((a: any) => a._id);

        let reporterId = "";
        if (typeof data.reporter !== "string") {
            reporterId = data.reporter._id;
        }

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

    async fetchMyTask(userId: string) {
        const tasks = await taskrepository.findByUserId(userId);
        return tasks;
    }

    async updateTaskById(data: ITask, id: string) {
        const { assignees, reporter } = data;
        const assigneesId = assignees.map((a: any) => a._id);

        const reporterId = (reporter as any)._id;

        data.assignees = assigneesId;
        data.reporter = reporterId;

        const updatedTask = await taskrepository.update(data, id);

        return updatedTask;
    }

    async deleteTaskById(id: string) {
        const deletedTask = await taskrepository.delete(id);
        return deletedTask;
    }

    async assignTaskUsingLLM(description: string) {
        const users = await userRepository.findAll();

        const context = `
            description : ${description},
            Users data : ${users}
        `;
        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "You are an expert Project Manager. Compare the task description against the User profiles and assign at most 3 person for the job.",
                },
                {
                    role: "user",
                    content: `Context: ${context}`,
                },
            ],
            text: {
                format: zodTextFormat(assigneeSchema, "assignee"),
            },
        });

        const assigneeIds = response?.output_parsed?.selectedUserId;

        if(!assigneeIds || assigneeIds.length === 0){
            throw new ApiError(400, "Auto assign failed")
        }
        const assignees = await userRepository.findByIds(assigneeIds);

        return assignees;
    }
}

export const taskService = new TaskService();
