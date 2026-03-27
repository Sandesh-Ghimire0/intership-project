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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                        {activities.map((log: IActivity) => (
                            <ActivityItem key={log._id} log={log} />
                        ))}
                    </ul>
                </div>

                <div className="mt-6 text-center">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition">
                        View all activity →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityList;
