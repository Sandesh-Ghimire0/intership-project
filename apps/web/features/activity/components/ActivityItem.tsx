"use client"

import { IActivity } from "@/features/shared/types/type";
import React from "react";
import { Edit3, Trash2, User, Clock } from "lucide-react";


interface ActivityItemProps {
    log: IActivity;
}

const ActivityItem = ({ log }: ActivityItemProps) => {
    return (
        <li
            key={log._id}
            className="p-5 hover:bg-gray-50 transition-colors duration-200"
        >
            <div className="flex items-start space-x-4">
                {/* Icon Indicator */}
                <div
                    className={`mt-1 p-2 rounded-lg ${
                        log.content.split(" ").includes("deleted")
                            ? "bg-red-50 text-red-600"
                            : log.content.split(" ").includes("updated")
                              ? "bg-blue-50 text-blue-600"
                              : "bg-green-50 text-green-600"
                    }`}
                >
                    {log.content.split(" ").includes("deleted") ? (
                        <Trash2 size={18} />
                    ) : (
                        <Edit3 size={18} />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">
                        <span className="font-semibold text-gray-900">
                            @{log.userId.username}
                        </span>{" "}
                        {log.content}
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                        Title: <span className="italic">"{log.title}"</span>
                    </p>

                    {/* Timestamp */}
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        "3 min ago"
                    </div>
                </div>

                {/* User Avatar Placeholder */}
                <div className="sm:block h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-500" />
                </div>
            </div>
        </li>
    );
};

export default ActivityItem;
