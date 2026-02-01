export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date | string;
    assignees: { id: string; name: string }[];
    reporter: { id: string; name: string };
    createdAt: string;
    updatedAt: string;
}
