export interface ITask {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high" | "critical";
    dueDate: Date;
    assignees: { id: string; name: string }[];
    reporter: { id: string; name: string };
}
