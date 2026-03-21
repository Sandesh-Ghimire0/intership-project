export const dynamic = "force-dynamic"; // don't fetch the task during build

import { fetchTask } from "@/features/tasks/api/api";
import TaskContainer from "@/features/tasks/components/TaskContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Tasks() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        redirect("/login");
    }
    const tasks = await fetchTask(token);

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
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            <TaskContainer initialTasks={tasks} />
        </div>
    );
}
