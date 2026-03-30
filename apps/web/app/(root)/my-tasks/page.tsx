export const dynamic = "force-dynamic";

import React from "react";
import TaskContainer from "@/features/tasks/components/TaskContainer";
import { serverFetch } from "@/lib/serverFetch";

const MyTasks = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await serverFetch("/api/v1/tasks/my");

    if (!res.data) {
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
            <h2 className="text-lg font-semibold mb-4">My Tasks</h2>

            <TaskContainer initialTasks={res.data} />
        </div>
    );
};

export default MyTasks;
