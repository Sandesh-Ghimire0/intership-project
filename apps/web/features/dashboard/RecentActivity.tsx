"use client";

import { formatDistanceToNow } from "date-fns";
import { Clock, Edit3, Trash2 } from "lucide-react";
import React from "react";
import { useAuthStore } from "../shared/store/useAuthStore";

const RecentActivity = ({ data }: any) => {
    const { user } = useAuthStore();

    return (
        <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="mb-3">
                <h3 className="text-lg font-semibold text-slate-800">
                    Recent Activity
                </h3>
            </div>
            {data.map((item: any) => (
                <div key={item._id} className="flex justify-between items-center py-4 border-b border-slate-200">
                    <div className="flex items-center gap-1">
                        <div
                            className={`mt-1 p-3 rounded-lg ${
                                item.content.split(" ").includes("deleted")
                                    ? "bg-red-50 text-red-600"
                                    : item.content
                                            .split(" ")
                                            .includes("updated")
                                      ? "bg-blue-50 text-blue-600"
                                      : "bg-green-50 text-green-600"
                            }`}
                        >
                            {item.content.split(" ").includes("deleted") ? (
                                <Trash2 size={18} />
                            ) : (
                                <Edit3 size={18} />
                            )}
                        </div>
                        <p className="text-sm text-gray-800">
                            <span className="font-semibold text-gray-900">
                                {item.userId.username === user?.username
                                    ? "You"
                                    : "@" + item.userId.username}
                            </span>{" "}
                            {item.content}
                        </p>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Title:{" "}
                            <span className="italic">"{item.title}"</span>
                        </p>
                    </div>
                    {/* Timestamp */}
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentActivity;
