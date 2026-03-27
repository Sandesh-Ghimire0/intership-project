export const dynamic = "force-dynamic";

import { fetchActivities } from "@/features/activity/api/api";
import ActivityList from "@/features/activity/components/ActivityList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AllActivity = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
        redirect("/login");
    }
    const logs = await fetchActivities(token);

    if (!logs) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the Activity data
                </h1>
            </div>
        );
    }

    return <ActivityList initialData={logs} />;
};

export default AllActivity;
