"use client";

import { ITask } from "@/features/shared/types/type";
import { useState } from "react";

interface AllTaskProps {
    initialTasks: ITask[];
}

function statusClasses(status: string) {
    if (status === "todo")
        return "bg-blue-200 text-blue-800 border border-blue-200";
    if (status === "in_progress")
        return "bg-amber-200 text-amber-800 border border-amber-200";
    return "bg-emerald-200 text-emerald-800 border border-emerald-200";
}

function priorityClasses(priority: string) {
    if (priority === "low")
        return "bg-emerald-200 text-emerald-800 border border-emerald-200";
    if (priority === "medium")
        return "bg-amber-200 text-amber-800 border border-amber-200";
    if (priority === "high")
        return "bg-red-200 text-red-800 border border-red-200";
    return "bg-red-200 text-red-900 border border-red-300";
}

const AllTask = ({ initialTasks }: AllTaskProps) => {
    const [showDetailsId, setShowDetailsId] = useState<string[]>([]);

    return (
        <div>
            {initialTasks.length === 0 ? (
                <p className="text-[13px] text-slate-500">No tasks found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 items-start">
                    {initialTasks?.map((task: ITask) => (
                        <div
                            key={task._id}
                            className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 flex flex-col gap-3 h-fit hover:border-blue-400 hover:shadow-md transition-all duration-200"
                        >
                            {/* ── HEADER: badges + show/hide ── */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-2 flex-wrap">
                                    <span
                                        className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-sm ${statusClasses(task.status)}`}
                                    >
                                        {task.status.replace("_", " ")}
                                    </span>
                                    <span
                                        className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-sm ${priorityClasses(task.priority)}`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        showDetailsId.includes(task._id)
                                            ? setShowDetailsId((prev) =>
                                                  prev.filter(
                                                      (id) => id !== task._id,
                                                  ),
                                              )
                                            : setShowDetailsId([
                                                  ...showDetailsId,
                                                  task._id,
                                              ])
                                    }
                                    className="text-[11px] text-blue-600 font-medium hover:underline shrink-0"
                                >
                                    {showDetailsId.includes(task._id)
                                        ? "Hide"
                                        : "Details"}
                                </button>
                            </div>

                            {/* ── TITLE ── */}
                            <h3 className="text-[15px] font-semibold text-slate-800 leading-snug">
                                {task.title}
                            </h3>

                            {/* ── DESCRIPTION ── */}
                            {task.description && (
                                <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-3">
                                    {task.description}
                                </p>
                            )}

                            {/* ── EXPANDED META ── */}
                            {showDetailsId.includes(task._id) && (
                                <>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] border-t border-slate-100 pt-3">
                                        {task.reporter && (
                                            <div>
                                                <p className="text-slate-400 font-medium mb-0.5">
                                                    Reporter
                                                </p>
                                                <p className="text-slate-600 font-medium">
                                                    {task.reporter.username}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <p className="text-slate-400 font-medium mb-0.5">
                                                Due Date
                                            </p>
                                            <p className="text-slate-600 font-medium">
                                                {new Date(
                                                    task.dueDate,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {task.assignees?.length > 0 && (
                                            <div className="col-span-2">
                                                <p className="text-slate-400 font-medium mb-0.5">
                                                    Assignees
                                                </p>
                                                <p className="text-slate-600 font-medium">
                                                    {task.assignees
                                                        .map((a: any) => a.username)
                                                        .join(", ")}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* TIMESTAMPS */}
                                    {(task.createdAt || task.updatedAt) && (
                                        <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                                            {task.createdAt && (
                                                <span>
                                                    Created:{" "}
                                                    {new Date(
                                                        task.createdAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                            {task.updatedAt && (
                                                <span>
                                                    Updated:{" "}
                                                    {new Date(
                                                        task.updatedAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTask;
