import { Document } from "mongoose";

export interface ITask {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    assignees: { id: string; name: string }[];
    reporter: { id: string; name: string };
}


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    description?: string;
}