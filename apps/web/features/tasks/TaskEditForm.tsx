"use client"

import React, { useState } from "react";
import { IFormData, ITask, Priority, Status } from "./type";
import { validateAssignee } from "../users/api";
import Link from "next/link";

interface TaskEditFormProps {
    task: any;
    onUpdate: (data: IFormData) => void;
}

const initialAssigneeError = {
    empty: false,
    duplicate: false,
    doesNotExist: false,
};

const TaskEditForm = ({ task, onUpdate }: TaskEditFormProps) => {
    const [formData, setFormData] = useState<IFormData>(task as any);

    const [assigneeName, setAssigneeName] = useState("");
    const [assingeeError, setAssigneeError] = useState(initialAssigneeError);

    // Add assignee locally
    const addAssignee = async () => {
        if (!assigneeName) return;

        const duplicateAssignee = formData.assignees.filter(
            (a: any) => a.username === assigneeName,
        );
        if (duplicateAssignee.length > 0) {
            setAssigneeError((prev) => ({
                ...initialAssigneeError,
                duplicate: true,
            }));

            return;
        }

        const res = await validateAssignee(assigneeName);
        const assignee = res?.data.data;
        if (res?.data?.success) {
            setFormData((prev: any) => ({
                ...prev,
                assignees: [...prev.assignees, assignee],
            }));

            setAssigneeName("");
            setAssigneeError(initialAssigneeError);
        } else if (res?.status === 400) {
            setAssigneeError((prev) => ({
                ...initialAssigneeError,
                doesNotExist: true,
            }));
        }
    };

    const removeAssignee = async (id: string) => {
        setFormData((prev: any) => ({
            ...prev,
            assignees: prev.assignees.filter((a: any) => a._id !== id),
        }));
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.assignees.length === 0) {
            setAssigneeError((prev) => ({
                ...initialAssigneeError,
                empty: true,
            }));
            return;
        }

        onUpdate(formData);
        setAssigneeError(initialAssigneeError);
    };

    console.log(formData);
    return (
        <div className="bg-white p-6 rounded-xl shadow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3xl">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Edit Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                        Title:
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        defaultValue={formData.title}
                        className="w-full border rounded px-3 py-2"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                        Description:
                    </div>
                    <textarea
                        placeholder="Description"
                        rows={5}
                        className="w-full border rounded px-3 py-2"
                        defaultValue={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                            Status:
                        </div>
                        <select
                            className="border rounded px-3 py-2 w-full"
                            defaultValue={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value as Status,
                                })
                            }
                        >
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                            Priority:
                        </div>
                        <select
                            className="border rounded px-3 py-2 w-full"
                            defaultValue={formData.priority}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    priority: e.target.value as Priority,
                                })
                            }
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>

                    <div className="relative">
                        <input
                            type="date"
                            className="w-full border rounded-lg px-4 py-2.5 
                                    text-gray-900 
                                    "
                            defaultValue={
                                formData.dueDate
                                    ? new Date(formData.dueDate)
                                          .toISOString()
                                          .split("T")[0]
                                    : ""
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dueDate: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>

                {/* ASSIGNEES */}
                <div className="border rounded p-3">
                    <p className="block text-sm font-medium text-gray-700 mb-1">
                        Assignees
                    </p>

                    <div className="flex flex-col gap-2">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="border rounded px-2 py-1 w-1/2"
                                value={assigneeName}
                                onChange={(e) =>
                                    setAssigneeName(e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={addAssignee}
                                className="text-sm text-blue-600 ml-2"
                            >
                                + Add Assignee
                            </button>
                        </div>
                        <div>
                            {assingeeError.doesNotExist && (
                                <p className="text-red-500 text-sm">
                                    Assignee Not found
                                </p>
                            )}
                            {assingeeError.empty && (
                                <p className="text-red-500 text-sm">
                                    Assignee is required
                                </p>
                            )}
                            {assingeeError.duplicate && (
                                <p className="text-red-500 text-sm">
                                    Already assigned
                                </p>
                            )}
                        </div>
                    </div>

                    <ul className="mt-2 text-sm">
                        {formData.assignees.map((a: any, i: any) => (
                            <li key={i}>
                                • {a?.username}{" "}
                                <span
                                    onClick={() => removeAssignee(a._id)}
                                    className="text-red-500 cursor-pointer text-[12px]"
                                >
                                    Remove
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/tasks"
                        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 text-center "
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Edit Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskEditForm;
