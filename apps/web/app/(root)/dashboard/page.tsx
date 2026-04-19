export const dynamic = "force-dynamic";

import PriorityDistribution from "@/features/dashboard/PriorityDistribution";
import RecentActivity from "@/features/dashboard/RecentActivity";
import Stats from "@/features/dashboard/Stats";
import StatusDistribution from "@/features/dashboard/StatusDistribution";
import TopTask from "@/features/dashboard/TopTask";
import { serverFetch } from "@/lib/serverFetch";
import React from "react";

const Dashboard = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await serverFetch("/api/v1/dashboard/summary");

    if (!res.data) {
        return (
            <div>
                <h1 className="text-4xl font-bold">
                    Failed to Load the Activity data
                </h1>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <Stats data={res.data.stats} />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                    <PriorityDistribution rawData={res.data.priorityDistribution} />
                </div>
                <div className="flex-1 min-w-0">
                    <StatusDistribution rawData={res.data.statusDistribution} />
                </div>
            </div>

            <div className="flex flex-col xl:flex-row items-start gap-6">
                <div className="w-full xl:flex-1 min-w-0">
                    <TopTask data={res.data.topPriorityTasks} />
                </div>
                <div className="w-full xl:w-96 shrink-0">
                    <RecentActivity data={res.data.recentActivity} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
