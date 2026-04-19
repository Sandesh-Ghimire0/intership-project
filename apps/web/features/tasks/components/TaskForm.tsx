"use client";

import { useEffect, useState } from "react";
import { IFormData } from "../task.type";
import Link from "next/link";
import {
    fetchUserSuggestions,
    validateAssignee,
} from "@/features/users/user.api";
import { Priority, Status } from "@/features/shared/types/type";
import { useDebounce } from "@/features/shared/hooks/useDebounce";
import { autoAssignTask } from "../task.api";

interface TaskFormProps {
    formData: IFormData;
    action: string;
    setFormData: React.Dispatch<React.SetStateAction<IFormData | undefined>>;
    onCreate: (formData: IFormData) => void;
    onUpdate: (data: IFormData) => void;
}

const initialAssigneeError = {
    empty: false,
    duplicate: false,
    doesNotExist: false,
};

const TaskForm = ({
    formData,
    action,
    setFormData,
    onCreate,
    onUpdate,
}: TaskFormProps) => {
    const [assigneeName, setAssigneeName] = useState("");
    const debouncedAssigneeName = useDebounce(assigneeName);
    const [users, setUsers] = useState([]);
    const [assingeeError, setAssigneeError] = useState(initialAssigneeError);

    const [isLoading, setIsLoading] = useState(false);

    const userSuggestions = async (text: string) => {
        try {
            const data = await fetchUserSuggestions(text);
            if (data.success) {
                setUsers(data.data);
            }
        } catch (error) {
            console.log("Failed to fetch suggestions", error);
        }
    };

    const handleSelectSuggestion = (username: string) => {
        setAssigneeName(username);
        setUsers([]); // Clear suggestions after selection
    };

    const handleAutoAssign = async () => {
        if (!formData.description) return;
        setIsLoading(true);

        try {
            const res = await autoAssignTask(formData.description);

            if (res?.status === 200) {
                const incomingAssignees = res.data.data;

                // include only the new person
                setFormData((prev: any) => {
                    const existingIds = prev.assignees.map((a: any) => a._id);
                    const uniqueNewAssignees = incomingAssignees.filter(
                        (newPerson: any) =>
                            !existingIds.includes(newPerson._id),
                    );

                    return {
                        ...prev,
                        assignees: [...prev.assignees, ...uniqueNewAssignees],
                    };
                });
            }
        } catch (error) {
            console.log("Error : while auto assign", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedAssigneeName.trim().length > 0) {
            userSuggestions(debouncedAssigneeName);
        } else {
            setUsers([]);
        }
    }, [debouncedAssigneeName]);

    // Add assignee locally
    const addAssignee = async () => {
        if (!assigneeName) return;

        const isDuplicate = formData.assignees.some(
            (a) => a.username === assigneeName,
        );

        if (isDuplicate) {
            setAssigneeError({ ...initialAssigneeError, duplicate: true });
            return;
        }

        const res = await validateAssignee(assigneeName);
        const assignee = res?.data.data;
        if (res?.data?.success) {
            setFormData((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    assignees: [...prev.assignees, assignee],
                };
            });

            setAssigneeName("");
            setAssigneeError(initialAssigneeError);
        } else if (res?.status === 400) {
            setAssigneeError({
                ...initialAssigneeError,
                doesNotExist: true,
            });
        }
    };

    const removeAssignee = (id: string) => {
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                assignees: prev.assignees.filter((a: any) => a._id !== id),
            };
        });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.assignees.length === 0) {
            setAssigneeError({
                ...initialAssigneeError,
                empty: true,
            });
            return;
        }

        if (!action) return;
        if (action === "create") onCreate(formData);
        if (action === "edit") onUpdate(formData);

        setFormData({
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            dueDate: "",
            assignees: [],
            reporter: null,
        });
        setAssigneeError(initialAssigneeError);
    };
    return (
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[500px] lg:w-3xl max-h-[90vh] overflow-y-auto z-50">
            <h2 className="text-lg font-semibold mb-4">
                {action === "edit" ? "Edit" : "Create"} Task
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col gap-4"
            >
                <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                        Title:
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
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
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                            Status:
                        </div>
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
                    </div>

                    <div className="flex-1">
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                            Priority:
                        </div>
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
                            value={
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

                    <div className="flex flex-col gap-2 relative">
                        {" "}
                        {/* Added relative for dropdown positioning */}
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                placeholder="Username..."
                                className="border rounded-lg px-4 py-2.5 
                                    text-gray-900"
                                value={assigneeName}
                                onChange={(e) =>
                                    setAssigneeName(e.target.value)
                                }
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={addAssignee}
                                className="text-sm text-blue-600 font-semibold px-1 hover:underline"
                            >
                                + Add
                            </button>

                            <button
                                type="button"
                                onClick={handleAutoAssign}
                                disabled={isLoading}
                                className={`ml-2 px-3 py-1 rounded text-sm font-medium border transition-all flex items-center gap-2
                                        ${
                                            isLoading
                                                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                                                : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600"
                                        }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                                        Assigning...
                                    </>
                                ) : (
                                    <>
                                        Auto assign
                                    </>
                                )}
                            </button>
                        </div>
                        {/* SUGGESTIONS DROPDOWN */}
                        {users?.length > 0 && (
                            <ul className="absolute top-10 z-10 w-1/2 bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-auto">
                                {users?.map((user: any) => (
                                    <li
                                        key={user._id}
                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                                        onClick={() =>
                                            handleSelectSuggestion(
                                                user.username,
                                            )
                                        }
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        )}
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

                    {/* Selected Assignees List */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.assignees.map((a: any) => (
                            <div
                                key={a._id}
                                className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs"
                            >
                                <span>{a?.username}</span>
                                <button
                                    type="button"
                                    onClick={() => removeAssignee(a._id)}
                                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/my-tasks"
                        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 text-center "
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        {action === "create" ? "Create" : "Edit"} Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
