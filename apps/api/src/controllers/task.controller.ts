import { Request, Response } from "express";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { AnyKeys } from "mongoose";

const createTask = async (req: Request, res: Response) => {
    try {
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
            return res.status(400).json({
                statusCode: 400,
                message: "Failed to create the task",
            });
        }

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "task created successfully",
            data: createdTask,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
            statusCode: 400,
            message: error.message,
        });
    }
};

const fetchTask = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find()
            .populate("assignees")
            .populate("reporter");

        if (!tasks) {
            return res.status(400).json({
                statusCode: 400,
                message: "Failed to fetch the tasks",
            });
        }
        return res.status(200).json({
            success: true,
            message: "tasks fetched successfully",
            data: tasks,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
            statusCode: 400,
            message: error.message,
        });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                statusCode: 400,
                message: "Id is required",
            });
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(400).json({
                statusCode: 400,
                message: "Task is not available",
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "task deleted successfully",
        });
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
            statusCode: 400,
            message: error.message,
        });
    }
};

const updateTask = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const { id } = req.params;
        
        if (!id || !data) {
            return res.status(400).json({
                statusCode: 400,
                message: "Id and data is required",
            });
        }

        const { assignees, reporter } = req.body;
        const assigneesId = assignees.map((a: any) => a._id);

        const reporterId = reporter._id


        data.assignees = assigneesId
        data.reporter = reporterId

        const updatedTask = await Task.findByIdAndUpdate(id, data, {
            new: true, // return updated document
            runValidators: true, // validate against the model schema
        }).populate("assignees").populate("reporter");

        if (!updatedTask) {
            return res.status(400).json({
                statusCode: 400,
                message: "Failed to update the task",
            });
        }

        return res.status(200).json({
            success: true,
            message: "task updated successfully",
            data: updatedTask,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(400).json({
            statusCode: 400,
            message: error.message,
        });
    }
};

export { createTask, fetchTask, deleteTask, updateTask };
