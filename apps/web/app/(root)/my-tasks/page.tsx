export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[22px] font-bold text-slate-800">My Tasks</h2>
                <Link
                    href="/my-tasks?create=true"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-[4px] transition-colors duration-150"
                >
                    + Create Task
                </Link>
            </div>
            <TaskContainer initialTasks={res.data} />
        </div>
    );
};

export default MyTasks;
