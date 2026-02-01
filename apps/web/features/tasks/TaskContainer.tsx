"use client"

import React, { useState } from "react";
import { createTask, deleteTask } from "./api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ITask } from "./type";

interface TaskContainerProps {
    initialTasks: ITask[]
}

const TaskContainer = ({ initialTasks }: TaskContainerProps) => {
    const [tasks, setTasks] = useState<ITask[]>(initialTasks);

    const handleCreate = async (taskData: ITask) => {
        const createdData = await createTask(taskData);
        if (createdData.statusCode === 201) {
            setTasks((prev: ITask[]) => [...prev, createdData.data]); // use createdData not formData because it does not include property added by db automatically
            // like _id, createdAt etc
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskForm onCreate={handleCreate} />

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Added Tasks</h2>
                <TaskList tasks={tasks} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default TaskContainer;
