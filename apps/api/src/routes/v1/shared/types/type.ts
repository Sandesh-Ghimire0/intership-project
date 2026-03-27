import { Document, Types } from "mongoose";

export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    assignees: IUser[] | string[];
    reporter: IUser | string;
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    description?: string;
}

export interface IActivity {
    userId: Types.ObjectId;
    receiverId: Types.ObjectId[];
    content: string;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create an interface that represents a saved Document
export interface IActivityDocument extends IActivity, Document {}