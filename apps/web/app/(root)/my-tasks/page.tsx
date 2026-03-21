export const dynamic = "force-dynamic";

import { fetchMyTasks } from "@/features/tasks/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import TaskContainer from "@/features/tasks/TaskContainer";

const MyTasks = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        redirect("/login");
    }
    const tasks = await fetchMyTasks(token);

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
};

export default MyTasks;
