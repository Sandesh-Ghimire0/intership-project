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

    return (
        <div>
            <Stats data={res.data.stats} />

            <div className="flex mt-5 gap-3">
                <PriorityDistribution rawData={res.data.priorityDistribution} />
                <StatusDistribution rawData={res.data.statusDistribution} />
            </div>

            <div className="flex items-start mt-5 gap-3">
                <TopTask data={res.data.topPriorityTasks} />
				<RecentActivity data={res.data.recentActivity} />
            </div>
        </div>
    );
};

export default Dashboard;
