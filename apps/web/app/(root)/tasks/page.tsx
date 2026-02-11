export const dynamic = 'force-dynamic';  // don't fetch the task during build

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
            <TaskContainer initialTasks={tasks} />
        </div>
    );
}
