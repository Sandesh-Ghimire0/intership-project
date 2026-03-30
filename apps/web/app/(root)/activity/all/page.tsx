export const dynamic = "force-dynamic";

import React from "react";
import ActivityList from "@/features/activity/components/ActivityList";
import { serverFetch } from "@/lib/serverFetch";

const AllActivity = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await serverFetch("/api/v1/activity");

    if (!res.data) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the Activity data
                </h1>
            </div>
        );
    }

    return <ActivityList initialData={res.data} />;
};

export default AllActivity;
