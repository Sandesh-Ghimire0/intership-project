import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    createNewTask,
    deleteTaskById,
    fetchAllTask,
    updateTaskById,
} from "../services/task.service.js";

const createTask = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const createdTask = await createNewTask(data);

    if (!createdTask) {
        throw new ApiError(400, "Failed to create the task");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdTask, "task created successfully"));
});

const fetchTask = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await fetchAllTask();

    if (!tasks) {
        throw new ApiError(400, "Failed to fetch the tasks");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "tasks fetched successfully"));
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Id is required");
    }

    const deletedTask = await deleteTaskById(id as string);
    if (!deletedTask) {
        throw new ApiError(400, "Task is not available");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, [], "task deleted successfully"));
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    if (!id || !data) {
        throw new ApiError(400, "Id and data is required");
    }

    const updatedTask = await updateTaskById(data, id as string);

    if (!updatedTask) {
        throw new ApiError(400, "Failed to update the task");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "task updated successfully"));
});

export { createTask, fetchTask, deleteTask, updateTask };
