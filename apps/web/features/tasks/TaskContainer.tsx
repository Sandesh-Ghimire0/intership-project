"use client";

import React, { useState } from "react";
import { createTask, deleteTask, updateTask } from "./api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { IFormData, ITask } from "./type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TaskEditForm from "./TaskEditForm";

interface TaskContainerProps {
    initialTasks: ITask[];
}

const TaskContainer = ({ initialTasks }: TaskContainerProps) => {
    const searchParams = useSearchParams();
    const isFormVisible = searchParams.get("showForm") === "true";
    const editId = searchParams.get("edit") as string;

    const router = useRouter();

    const [tasks, setTasks] = useState<ITask[]>(initialTasks);
    const editedTask = tasks.find((task) => task._id === editId) as ITask;

    const handleCreate = async (taskData: IFormData) => {
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

    const handleUpdate = async (taskData: any) => {
        const res = await updateTask(editId, taskData);
        const updatedTask = res?.data.data;

        if (res?.status === 200) {
            setTasks((prev: any) =>
                prev.map((t: any) => (t._id === editId ? updatedTask : t)),
            );
            router.push("/tasks");
        }
    };

    return (
        <div>
            {(isFormVisible || editId?.length > 0) && (
                <div
                    onClick={() => router.push("/tasks")}
                    className="fixed  z-50 inset-0 bg-black/50"
                >
                    {editId?.length > 0 && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <TaskEditForm
                                task={editedTask}
                                onUpdate={handleUpdate}
                            />
                        </div>
                    )}
                    {isFormVisible && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <TaskForm onCreate={handleCreate} />
                        </div>
                    )}
                </div>
            )}

            <div>
                <TaskList tasks={tasks} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default TaskContainer;
