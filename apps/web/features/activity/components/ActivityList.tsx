"use client";

import React, { useEffect } from "react";
import { IActivity } from "@/features/shared/types/type";
import ActivityItem from "./ActivityItem";
import { useActivityStore } from "@/features/shared/store/useActivityStore";

const ActivityList = ({ initialData }: { initialData: IActivity[] }) => {
    const { activities, setActivities } = useActivityStore();

    useEffect(() => {
        if (initialData) {
            setActivities(initialData);
        }
    }, [initialData, setActivities]);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                {/* Log List */}
                <div>
                    <ul className="grid grid-cols-2 gap-1 ">
                        {activities.map((log: IActivity) => (
                            <ActivityItem key={log._id} log={log} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ActivityList;
