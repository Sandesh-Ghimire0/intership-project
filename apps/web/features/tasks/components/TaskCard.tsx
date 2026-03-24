"use client";

import { ITask } from "@/features/shared/types/type";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TasksProps {
    task: ITask;
    onDelete: (id: string) => void;
}

const TaskCard = ({ task, onDelete }: TasksProps) => {
    const [showDeleteBox, setShowDeleteBox] = useState(false);

    return (
        <div
            key={task._id}
            className="rounded-lg py-4 px-5 bg-white shadow-sm flex flex-col justify-between gap-3 hover:shadow-lg"
        >
            <div className="flex justify-between items-center text-sm mt-3">
                <div className="flex gap-2">
                    <span
                        className={`${
                            task.status === "todo"
                                ? "bg-purple-400 px-4 py-1 rounded text-purple-950"
                                : task.status === "in_progress"
                                  ? "bg-yellow-400 px-4 py-1 rounded text-yellow-950"
                                  : "bg-green-600 px-4 py-1 rounded text-green-950"
                        }`}
                    >
                        {task.status}
                    </span>
                    <span
                        className={`${
                            task.priority === "low"
                                ? "bg-green-400 px-4 py-1 rounded text-green-950"
                                : task.priority === "medium"
                                  ? "bg-orange-400 px-4 py-1 rounded text-oragne-950"
                                  : task.priority === "high"
                                    ? "bg-sky-500 px-4 py-1 rounded text-blue-950"
                                    : "bg-red-600 px-4 py-1 rounded text-red-950"
                        }`}
                    >
                        {task.priority}
                    </span>
                </div>
                <div>
                    <span className="text-gray-400">Due:</span>
                    <span className=" text-gray-400 rounded">
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
            {/* TITLE */}
            <h3 className="font-semibold text-lg">{task.title}</h3>

            {/* DESCRIPTION */}
            {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
            )}

            <div className="flex  justify-between">
                {/* REPORTER */}
                {task.reporter && (
                    <div className="text-sm">
                        <div className="font-semibold text-center">
                            Reporter
                        </div>
                        <br />{" "}
                        <span className="shadow px-4 py-1">
                            {task.reporter.username}
                        </span>
                    </div>
                )}

                {/* ASSIGNEES */}
                {task.assignees?.length > 0 && (
                    <div className="text-sm ">
                        <div className="font-semibold text-center">
                            Assignees:
                        </div>
                        <ul className="grid grid-cols-2 ml-5 mt-1">
                            {task.assignees.map((a: any, idx: number) => (
                                <li
                                    key={idx}
                                    className="shadow px-4 py-1 ml-1 mt-1"
                                >
                                    {a.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* TIMESTAMPS */}
            {(task.createdAt || task.updatedAt) && (
                <div className="text-xs text-gray-400 mt-3">
                    {task.createdAt && (
                        <span>
                            Created: {new Date(task.createdAt).toLocaleString()}
                        </span>
                    )}
                    {task.updatedAt && (
                        <span className="ml-4">
                            Updated: {new Date(task.updatedAt).toLocaleString()}
                        </span>
                    )}
                </div>
            )}

            <div className="flex justify-end gap-5">
                <button
                    onClick={() => setShowDeleteBox(true)}
                    className="p-2 bg-red-600 text-lg text-white rounded-full"
                >
                    <MdDelete />
                </button>

                <Link
                    href={`/my-tasks?edit=${task._id}`}
                    className="p-2 rounded-full bg-blue-600 text-white"
                >
                    <FaEdit />
                </Link>
            </div>
            {showDeleteBox && (
                <div
                    className="fixed z-50 inset-0 bg-black/50"
                    onClick={() => setShowDeleteBox(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-sm p-4"
                    >
                        <p className="font-md tracking-wide">
                            Do you want to delete this task ?
                        </p>

                        <div className="flex justify-end gap-5">
                            <button
                                onClick={() => {
                                    setShowDeleteBox(false);
                                    console.log(task._id);
                                    onDelete(task._id);
                                }}
                                className="bg-gray-200 text-black px-4 py-2 rounded-lg mt-8 "
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setShowDeleteBox(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 "
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
