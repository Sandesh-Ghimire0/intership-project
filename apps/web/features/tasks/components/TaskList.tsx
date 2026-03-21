"use client";

import Link from "next/link";
import { ITask } from "../../shared/types/type";
import { useSearchParams } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: ITask[];
    onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onDelete }: TaskListProps) => {
    const searchParams = useSearchParams();

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
                </div>
        )}
        </div>
    );
};

export default TaskList;
