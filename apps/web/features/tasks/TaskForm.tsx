"use client";

import { useState } from "react";
import { IFormData, ITask, Priority, Status } from "./type";
import Link from "next/link";
import { validateAssignee } from "./api";

interface TaskFormProps {
    onCreate: (formData: IFormData) => void;
}

const TaskForm = ({ onCreate }: TaskFormProps) => {
    const [formData, setFormData] = useState<IFormData>({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
        assignees: [],
        reporter: "sandesh_dev",
    });

    const [assigneeName, setAssigneeName] = useState("");
    const [assingeeError, setAssigneeError] = useState(false);

    // Add assignee locally
    const addAssignee = async () => {
        if (!assigneeName) return;

        const res = await validateAssignee(assigneeName);
        if (res?.data?.success) {
            setFormData((prev) => ({
                ...prev,
                assignees: [...prev.assignees, assigneeName],
            }));

            setAssigneeName("");
            setAssigneeError(false);
        }else if(res?.status === 400){
            setAssigneeError(true)
        }

        
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        console.log("task create click");
        e.preventDefault();

        if (formData.assignees.length === 0) {
            setAssigneeError(true);
            return;
        }

        onCreate(formData);

        setFormData({
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            dueDate: "",
            assignees: [],
            reporter: "sandesh_dev",
        });
        setAssigneeError(false);
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-lg font-semibold mb-4">Create Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border rounded px-3 py-2"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                />

                <textarea
                    placeholder="Description"
                    className="w-full border rounded px-3 py-2"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />

                <div className="flex gap-3">
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={formData.status}
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

                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={formData.priority}
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

                <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    value={formData.dueDate as string}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            dueDate: e.target.value,
                        })
                    }
                    required
                />

                {/* ASSIGNEES */}
                <div className="border rounded p-3">
                    <p className="font-medium mb-2">Add Assignee</p>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Username"
                            className="border rounded px-2 py-1 w-1/2"
                            value={assigneeName}
                            onChange={(e) => setAssigneeName(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addAssignee}
                        className="mt-2 text-sm text-blue-600"
                    >
                        + Add Assignee
                    </button>

                    <ul className="mt-2 text-sm">
                        {formData.assignees.map((a: any, idx) => (
                            <li key={idx}>• {a}</li>
                        ))}
                    </ul>
                    {assingeeError && (
                        <p className="text-red-500 text-sm">
                            Assignee Not found
                        </p>
                    )}
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
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
