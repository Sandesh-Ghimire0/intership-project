"use client";

import { ITask } from "../../shared/types/type";

import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: ITask[];
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: (id: string) => void;
}

const TaskList = ({
    tasks,
    isAuthorized,
    setIsAuthorized,
    onDelete,
}: TaskListProps) => {
    return (
        <div>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
                    {tasks?.map((task: ITask) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                        />
                    ))}
                    {!isAuthorized && (
                        <div
                            className="fixed z-50 inset-0 bg-black/50"
                            onClick={() => setIsAuthorized(true)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-sm p-4"
                            >
                                <p className="font-md tracking-wide">
                                    Access Forbidden
                                </p>

                                <div className="text-end">
                                    <button
                                        onClick={() => setIsAuthorized(true)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 "
                                    >
                                        ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskList;
