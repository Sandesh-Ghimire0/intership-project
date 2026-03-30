export const dynamic = "force-dynamic"; // don't fetch the task during build

import AllTask from "@/features/tasks/components/AllTask";
import { serverFetch } from "@/lib/serverFetch";

export default async function Tasks() {
    const res = await serverFetch("/api/v1/tasks");

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
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            <AllTask initialTasks={res.data} />
        </div>
    );
}
