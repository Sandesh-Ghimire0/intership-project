"use client";

import { ITask } from "@/features/shared/types/type";
import { useState } from "react";

interface AllTaskProps {
    initialTasks: ITask[];
}

const AllTask = ({ initialTasks }: AllTaskProps) => {
    const [showDetailsId, setShowDetailsId] = useState<string[]>([]);
    return (
        <div>
            {initialTasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2  items-start">
                    {initialTasks?.map((task: ITask) => (
                        <div
                            key={task._id}
                            className="rounded-lg py-4 px-5 bg-white shadow-sm flex flex-col justify-between gap-3 hover:shadow-lg h-fit transition-all duration-300"
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
                                        {new Date(
                                            task.dueDate,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            {/* TITLE */}
                            <h3 className="font-semibold text-lg">
                                {task.title}
                            </h3>

                            {/* DESCRIPTION */}
                            {task.description && (
                                <p className="text-sm text-gray-600">
                                    {task.description}
                                </p>
                            )}

                            {!showDetailsId.includes(task._id) && (
                                <button
                                    onClick={() =>
                                        setShowDetailsId([
                                            ...showDetailsId,
                                            task._id,
                                        ])
                                    }
                                    className="text-end underline text-sm text-blue-700"
                                >
                                    Show Details
                                </button>
                            )}
                            {showDetailsId.length > 0 &&
                                showDetailsId.includes(task._id) && (
                                    <>
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
                                                        {task.assignees.map(
                                                            (
                                                                a: any,
                                                                idx: number,
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="shadow px-4 py-1 ml-1 mt-1"
                                                                >
                                                                    {a.username}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* TIMESTAMPS */}
                                        {(task.createdAt || task.updatedAt) && (
                                            <div className="text-xs text-gray-400 mt-3">
                                                {task.createdAt && (
                                                    <span>
                                                        Created:{" "}
                                                        {new Date(
                                                            task.createdAt,
                                                        ).toLocaleString()}
                                                    </span>
                                                )}
                                                {task.updatedAt && (
                                                    <span className="ml-4">
                                                        Updated:{" "}
                                                        {new Date(
                                                            task.updatedAt,
                                                        ).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            onClick={() =>
                                                setShowDetailsId((prev) =>
                                                    prev.filter(
                                                        (id) => id !== task._id,
                                                    ),
                                                )
                                            }
                                            className="text-end underline text-sm text-blue-700"
                                        >
                                            Hide Details
                                        </button>
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
