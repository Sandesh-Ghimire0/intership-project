import mongoose from "mongoose";
import { ITask } from "../types/type.js";

const taskSchema = new mongoose.Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["todo", "in_progress", "done"],
            default: "todo",
            index: true,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
            index: true,
        },

        dueDate: {
            type: Date,
            required: true,
            index: true,
        },

        assignees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    },
    { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
