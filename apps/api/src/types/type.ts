import mongoose, { Document } from "mongoose";

export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    assignees: IUser[] | mongoose.Types.ObjectId[];
    reporter: string;
}

export interface IUser{
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    description?: string;
}

