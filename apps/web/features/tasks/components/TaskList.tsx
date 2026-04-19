"use client";

import { ITask } from "../../shared/types/type";

import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: ITask[];
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: (id: string, reporterId: string) => void;
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
                <p className="text-[13px] text-slate-500">No tasks found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks?.map((task: ITask) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                        />
                    ))}
                    {!isAuthorized && (
                        <div
                            className="fixed z-50 inset-0 bg-black/40"
                            onClick={() => setIsAuthorized(true)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-sm w-80 p-5"
                            >
                                <p className="text-[14px] font-semibold text-slate-800">
                                    Access Forbidden
                                </p>
                                <p className="text-[13px] text-slate-500 mt-1">
                                    You don&apos;t have permission to perform this action.
                                </p>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => setIsAuthorized(true)}
                                        className="bg-blue-600 text-white px-4 py-1.5 text-[13px] rounded-sm hover:bg-blue-700 transition-colors"
                                    >
                                        OK
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
