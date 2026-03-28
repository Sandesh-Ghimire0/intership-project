export interface IUser {
    _id: string;
    username: string;
    email: string;
    role: string;
    description: string;
}

export type Status = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high" | "critical";

export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date | string;
    assignees: IUser[];
    reporter: IUser;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface IActivity {
    _id: string;
    userId: IUser;
    receiverId: IUser[];
    content: string;
    title: string;
    createdAt: string;
}
