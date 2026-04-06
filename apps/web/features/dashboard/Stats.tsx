"use client";

import { CircleCheckBig, ClipboardClock, LayoutList, List } from "lucide-react";

const Stats = ({data}: any) => {
    return (
        <div className="grid grid-cols-4 gap-5">
            <div className="bg-white px-6 py-3 text-start rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-2xl p-3 bg-slate-50 rounded-lg">
                    <List />
                </div>
                <div>
                    <p className="text-sm text-slate-500">Overall Tasks</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {data.totalTasks}
                    </p>
                </div>
            </div>

            <div className="bg-white px-6 py-3 text-start rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-2xl p-3 bg-slate-50 rounded-lg">
                    <LayoutList />
                </div>
                <div>
                    <p className="text-sm text-slate-500">My Tasks</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {data.myTotalTasks}
                    </p>
                </div>
            </div>

            <div className="bg-white px-6 py-3 text-start rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-2xl p-3 bg-slate-50 rounded-lg">
                    <ClipboardClock />
                </div>
                <div>
                    <p className="text-sm text-slate-500">Overdue Tasks</p>
                    <p className="text-2xl font-bold text-red-600">
                        {data.myOverdueTasks}
                    </p>
                </div>
            </div>

            <div className="bg-white px-6 py-3 text-start rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-2xl p-3 bg-slate-50 rounded-lg">
                    <CircleCheckBig />
                </div>
                <div>
                    <p className="text-sm text-slate-500">Completion Rate</p>
                    <p className="text-2xl font-bold text-teal-600">
                        {data.completionRate}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Stats;
