import React from "react";

const TopTask = ({ data }: any) => {
    return (
        <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="mb-3">
                <h3 className="text-lg font-semibold text-slate-800">
                    Important Tasks
                </h3>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Due Date</th>
                        <th className="px-6 py-3">Priority</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((task: any) => (
                        <tr
                            key={task._id}
                            className="hover:bg-slate-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium">
                                {task.title}
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                                {new Date(task.dueDate).toDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`${
                                        task.priority === "low"
                                            ? "bg-green-400 px-4 py-1 rounded text-green-950"
                                            : task.priority === "medium"
                                              ? "bg-orange-400 px-4 py-1 rounded text-oragne-950"
                                              : task.priority === "high"
                                                ? "bg-sky-400 px-4 py-1 rounded text-blue-950"
                                                : "bg-red-400 px-4 py-1 rounded text-red-950"
                                    }`}
                                >
                                    {task.priority}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopTask;
