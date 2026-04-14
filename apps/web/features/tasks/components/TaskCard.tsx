"use client";

import { ITask } from "@/features/shared/types/type";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TasksProps {
    task: ITask;
    onDelete: (id: string, reporterId: string) => void;
}

/** Returns tonal badge classes based on status */
function statusClasses(status: string) {
    if (status === "todo")
        return "bg-blue-200 text-blue-800 border border-blue-200";
    if (status === "in_progress")
        return "bg-amber-200 text-amber-800 border border-amber-200";
    return "bg-emerald-200 text-emerald-800 border border-emerald-200";
}

/** Returns tonal badge classes based on priority */
function priorityClasses(priority: string) {
    if (priority === "low")
        return "bg-emerald-200 text-emerald-800 border border-emerald-200";
    if (priority === "medium")
        return "bg-amber-200 text-amber-800 border border-amber-200";
    if (priority === "high")
        return "bg-red-200 text-red-800 border border-red-200";
    return "bg-red-200 text-red-900 border border-red-300";
}

const TaskCard = ({ task, onDelete }: TasksProps) => {
    const [showDeleteBox, setShowDeleteBox] = useState(false);

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col gap-3 hover:border-blue-400 hover:shadow-md transition-all duration-200">

            {/* ── HEADER: badges + action icons ── */}
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

                <div className="flex gap-1.5 shrink-0">
                    <Link
                        href={`/my-tasks?edit=${task._id}`}
                        className="border border-slate-200 p-1.5 rounded-[4px] text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-500 transition-colors duration-150"
                        title="Edit task"
                    >
                        <FaEdit size={13} />
                    </Link>
                    <button
                        onClick={() => setShowDeleteBox(true)}
                        className="border border-slate-200 p-1.5 rounded-[4px] text-slate-500 hover:bg-slate-50 hover:text-red-600 hover:border-red-400 transition-colors duration-150"
                        title="Delete task"
                    >
                        <MdDelete size={14} />
                    </button>
                </div>
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

            {/* ── META GRID ── */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] border-t border-slate-100 pt-3">
                {/* Reporter */}
                {task.reporter && (
                    <div>
                        <p className="text-slate-400 font-medium mb-0.5">Reporter</p>
                        <p className="text-slate-600 font-medium">{task.reporter.username}</p>
                    </div>
                )}

                {/* Due Date */}
                <div>
                    <p className="text-slate-400 font-medium mb-0.5">Due Date</p>
                    <p className="text-slate-600 font-medium">
                        {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Assignees — full width */}
                {task.assignees?.length > 0 && (
                    <div className="col-span-2">
                        <p className="text-slate-400 font-medium mb-0.5">Assignees</p>
                        <p className="text-slate-600 font-medium">
                            {task.assignees.map((a: any) => a.username).join(", ")}
                        </p>
                    </div>
                )}
            </div>

            {/* ── FOOTER: timestamps ── */}
            {(task.createdAt || task.updatedAt) && (
                <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 mt-auto">
                    {task.createdAt && (
                        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    )}
                    {task.updatedAt && (
                        <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                    )}
                </div>
            )}

            {/* ── DELETE CONFIRM DIALOG ── */}
            {showDeleteBox && (
                <div
                    className="fixed z-50 inset-0 bg-black/40"
                    onClick={() => setShowDeleteBox(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-[4px] w-80 p-5"
                    >
                        <p className="text-[14px] font-semibold text-slate-800">
                            Delete task?
                        </p>
                        <p className="text-[13px] text-slate-500 mt-1">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setShowDeleteBox(false)}
                                className="border border-slate-200 text-slate-700 px-4 py-1.5 text-[13px] rounded-[4px] hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteBox(false);
                                    onDelete(task._id, task.reporter._id);
                                }}
                                className="bg-red-600 text-white px-4 py-1.5 text-[13px] rounded-[4px] hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
