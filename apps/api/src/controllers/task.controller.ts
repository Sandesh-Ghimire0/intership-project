import { Request, Response } from "express";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req: Request, res: Response) => {
    const {
        title,
        description,
        status,
        priority,
        dueDate,
        assignees,
        reporter,
    } = req.body;

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

    if (!createdTask) {
        throw new ApiError(400, "Failed to create the task");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdTask, "task created successfully"));
});

const fetchTask = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await Task.find().populate("assignees").populate("reporter");

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

    const deletedTask = await Task.findByIdAndDelete(id);
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

    const { assignees, reporter } = req.body;
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

    if (!updatedTask) {
        throw new ApiError(400, "Failed to update the task");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "task updated successfully"));
});

export { createTask, fetchTask, deleteTask, updateTask };
