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

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    description?: string;
}
