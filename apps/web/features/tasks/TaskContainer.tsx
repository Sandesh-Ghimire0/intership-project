"use client";

import React, { useState } from "react";
import { createTask, deleteTask } from "./api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ITask } from "./type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface TaskContainerProps {
    initialTasks: ITask[];
}

const TaskContainer = ({ initialTasks }: TaskContainerProps) => {
    const searchParams = useSearchParams();
    const isFormVisible = searchParams.get("showForm") === "true";

    const router = useRouter();

    const [tasks, setTasks] = useState<ITask[]>(initialTasks);

    const handleCreate = async (taskData: ITask) => {
        const createdData = await createTask(taskData);
        if (createdData.statusCode === 201) {
            setTasks((prev: ITask[]) => [...prev, createdData.data]); // use createdData not formData because it does not include property added by db automatically
            // like _id, createdAt etc
            router.push("/tasks");
        }
    };

    const handleDelete = async (id: string) => {
        const res = await deleteTask(id);

        if (res?.status === 200) {
            setTasks((prev: ITask[]) =>
                prev.filter((task: ITask) => task._id !== id),
            );
        }
    };

    return (
        <div>
            {isFormVisible && (
                <div
                    onClick={() => router.push("/tasks")}
                    className="fixed inset-0 backdrop-blur-sm"
                >
                    <div onClick={(e)=>e.stopPropagation()}>
                        <TaskForm onCreate={handleCreate} />
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-lg font-semibold mb-4">Added Tasks</h2>
                <TaskList tasks={tasks} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default TaskContainer;
