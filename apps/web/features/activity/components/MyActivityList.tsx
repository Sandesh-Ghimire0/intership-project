"use client";

import React, { useEffect } from "react";
import { IActivity } from "@/features/shared/types/type";
import ActivityItem from "./ActivityItem";
import { useActivityStore } from "@/features/shared/store/useActivityStore";

const MyActivityList = ({ initialData }: { initialData: IActivity[] }) => {
    const { myActivities, setMyActivities } = useActivityStore();

    useEffect(() => {
        if (initialData) {
            setMyActivities(initialData);
        }
    }, [initialData, setMyActivities]);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">

                {/* Log List */}
                <div>
                    <ul className="grid grid-cols-2 gap-1">
                        {myActivities.map((log: IActivity) => (
                            <ActivityItem key={log._id} log={log} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyActivityList;
