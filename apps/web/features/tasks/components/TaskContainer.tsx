"use client";

import React, { useEffect, useState } from "react";
import { createTask, deleteTask, updateTask } from "../task.api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ITask, IUser } from "@/features/shared/types/type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IFormData } from "../task.type";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { getSocket } from "@/app/socket";

interface TaskContainerProps {
    initialTasks: ITask[];
}

const TaskContainer = ({ initialTasks }: TaskContainerProps) => {
    const socket = getSocket();

    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuthStore();

    const [tasks, setTasks] = useState<ITask[]>(initialTasks);
    const [formData, setFormData] = useState<IFormData | undefined>();
    const [action, setAction] = useState<"create" | "edit">("create");
    const [isAuthorized, setIsAuthorized] = useState(true);

    const isCreateTask = searchParams.get("create") === "true";
    const editTaskId = searchParams.get("edit") as string;

    // Sync form state with URL params
    useEffect(() => {
        if (editTaskId) {
            const foundTask = tasks.find((t) => t._id === editTaskId);

            if (foundTask) {
                setAction("edit");
                setFormData(foundTask);
            }
        } else if (isCreateTask) {
            setAction("create");
            setFormData({
                title: "",
                description: "",
                status: "todo",
                priority: "medium",
                dueDate: "",
                assignees: [],
                reporter: user,
            });
        }
    }, [editTaskId, isCreateTask, tasks, user]);

    const handleCreate = async (taskData: IFormData) => {
        const createdData = await createTask(taskData);
        if (createdData.statusCode === 201) {
            setTasks((prev: ITask[]) => [...prev, createdData.data]); // use createdData not formData because it does not include property added by db automatically
            // like _id, createdAt etc
            socket.emit("activity", {
                userId: user?._id,
                receiverId: createdData.data.assignees.map((a: any) => a._id),
                content: "created the task",
                title: createdData.data.title,
            });
            router.push("/my-tasks");
        }
    };

    const handleDelete = async (id: string, reporterId: string) => {
        // prevents network call when user is not authorized for delete
        if (user?._id !== reporterId) {
            setIsAuthorized(false);
            return;
        } else {
            setIsAuthorized(true);
        }
        const res = await deleteTask(id);

        if (res?.status === 200) {
            const deletedTask = res?.data.data;
            setTasks((prev: ITask[]) =>
                prev.filter((task: ITask) => task._id !== id),
            );
            socket.emit("activity", {
                userId: user?._id,
                receiverId: deletedTask.assignees.map((a: any) => a._id),
                content: "deleted the task",
                title: deletedTask.title,
            });
        } else if (res?.status === 403) {
            setIsAuthorized(false);
        }
    };

    const handleUpdate = async (taskData: any) => {
        // prevents network call when user is not authorized for update
        if (user?._id !== taskData.reporter._id) {
            setIsAuthorized(false);
            return;
        } else {
            setIsAuthorized(true);
        }

        const res = await updateTask(editTaskId, taskData);
        const updatedTask = res?.data.data;

        if (res?.status === 200) {
            setTasks((prev: any) =>
                prev.map((t: any) => (t._id === editTaskId ? updatedTask : t)),
            );
            socket.emit("activity", {
                userId: user?._id,
                receiverId: updatedTask.assignees.map((a: any) => a._id),
                content: "updated the task",
                title: updatedTask.title,
            });
            router.push("/my-tasks");
        } else if (res?.status === 403) {
            setIsAuthorized(false);
        }
    };

    return (
        <div>
            {(isCreateTask || editTaskId?.length > 0) && formData && (
                <div
                    onClick={() => router.push("/my-tasks")}
                    className="fixed  z-50 inset-0 bg-black/50"
                >
                    {action && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <TaskForm
                                formData={formData}
                                action={action}
                                setFormData={setFormData}
                                onCreate={handleCreate}
                                onUpdate={handleUpdate}
                            />
                        </div>
                    )}
                </div>
            )}

            <div>
                <TaskList
                    tasks={tasks}
                    isAuthorized={isAuthorized}
                    setIsAuthorized={setIsAuthorized}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default TaskContainer;
