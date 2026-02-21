import mongoose, { Document } from "mongoose";

export interface ITask {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    assignees: mongoose.Types.ObjectId[];
    reporter: mongoose.Types.ObjectId;
}

export interface IUser{
    username: string;
    email: string;
    password: string;
    role: string;
    description?: string;
}

type Name = string
type Status = "todo" | "in_progress" | "done";