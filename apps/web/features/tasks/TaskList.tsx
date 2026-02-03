"use client";

import { ITask } from "./type";

interface TaskListProps {
    tasks: ITask[];
    onDelete: (id: string) => void
}

const TaskList =  ({tasks, onDelete}:TaskListProps) => {
    console.log("tasks ::",tasks)
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
                    {tasks?.map((task:any) => (
                        <div
                            key={task._id}
                            className="border rounded-lg p-4 bg-white shadow-sm"
                        >
                            {/* TITLE */}
                            <h3 className="font-semibold text-lg">
                                {task.title}
                            </h3>

                            {/* DESCRIPTION */}
                            {task.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {task.description}
                                </p>
                            )}

                            {/* META INFO */}
                            <div className="flex flex-wrap gap-4 text-sm mt-3">
                                <span>
                                    <b>Status:</b> {task.status}
                                </span>
                                <span>
                                    <b>Priority:</b> {task.priority}
                                </span>

                                {task.dueDate && (
                                    <span>
                                        <b>Due:</b>{" "}
                                        {new Date(
                                            task.dueDate,
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                            </div>

                            {/* REPORTER */}
                            {task.reporter && (
                                <div className="text-sm mt-3">
                                    <b>Reporter:</b> {task.reporter.username}
                                </div>
                            )}

                            {/* ASSIGNEES */}
                            {task.assignees?.length > 0 && (
                                <div className="text-sm mt-2">
                                    <b>Assignees:</b>
                                    <ul className="list-disc ml-5 mt-1">
                                        {task.assignees.map(
                                            (a: any, idx: number) => (
                                                <li key={idx}>
                                                    {a.username}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}

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
                                onClick={() => onDelete(task._id)}
                                className="px-4 py-2 bg-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
