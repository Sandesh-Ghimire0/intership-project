"use client";

import { IActivity } from "@/features/shared/types/type";
import React from "react";
import { Edit3, Trash2, User, Clock } from "lucide-react";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";

interface ActivityItemProps {
    log: IActivity;
}

const ActivityItem = ({ log }: ActivityItemProps) => {
    const { user } = useAuthStore();
    return (
        <li key={log._id}>
            <div className="flex items-center justify-between space-x-4 bg-white p-5 hover:bg-gray-50 shadow-md transition-colors duration-200">
                {/* Icon Indicator */}
                <div className="flex justify-between w-full gap-2">
                    <div
                        className={`mt-1 p-3 rounded-lg ${
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
                                {log.userId.username === user?.username
                                    ? "You"
                                    : "@" + log.userId.username}
                            </span>{" "}
                            {log.content}
                        </p>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Title: <span className="italic">"{log.title}"</span>
                        </p>
                    </div>
                    {/* Timestamp */}
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        {formatDistanceToNow(new Date(log.createdAt), {
                            addSuffix: true,
                        })}
                    </div>
                </div>

                {/* User Avatar Placeholder */}
                {/* <button className="text-2xl text-red-500">
                    <MdDelete />
                </button> */}
            </div>
        </li>
    );
};

export default ActivityItem;
