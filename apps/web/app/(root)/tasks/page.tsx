import { fetchTask } from "@/features/tasks/api";
import TaskContainer from "@/features/tasks/TaskContainer";

export default async function Tasks() {
    const tasks = await fetchTask();

    if (!tasks) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the task data
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 relative">
                Real-Time Task Management
            </h1>

            <TaskContainer initialTasks={tasks} />
        </div>
    );
}
