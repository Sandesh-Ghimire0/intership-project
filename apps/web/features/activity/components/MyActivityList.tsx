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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Activity Log
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Track the latest changes in your project
                    </p>
                </div>

                {/* Log List */}
                <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <ul className="grid grid-cols-2 gap-2.5 bg-white ">
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
