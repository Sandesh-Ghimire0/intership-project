import React from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* NAVBAR */}
            <header className="sticky bg-gray-900 top-0 z-50 h-16 text-gray-200 flex items-center justify-between p-6">
                {/* Logo */}
                <div className="font-bold text-lg w-56">Tasks</div>

                {/* Search */}
                <div className="px-6">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full max-w-4xl border rounded-lg px-3 py-1.5"
                    />
                </div>

                {/* Create Task  */}
                <Link
                    href="/tasks?showForm=true"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700/60"
                >
                    + Create Task
                </Link>
            </header>

            {/* BODY */}
            <div className="flex flex-1">
                {/* SIDEBAR */}
                <aside className="sticky  top-16 h-[calc(100vh-4rem)] w-56 bg-gray-800 text-white flex flex-col justify-between py-6">
                    {/* TOP MENU */}
                    <nav className="space-y-3">
                        <ul className="space-y-2 mt-3">
                            <li className="hover:bg-gray-700 cursor-pointer">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-4 py-2"
                                >
                                    <MdDashboard />
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li className="hover:bg-gray-700 cursor-pointer">
                                <Link
                                    href="/tasks"
                                    className="flex items-center gap-3 px-4 py-2"
                                >
                                    <GrTasks />
                                    <span>Tasks</span>
                                </Link>
                            </li>

                            <li className="hover:bg-gray-700 cursor-pointer">
                                <Link
                                    href="/my-tasks"
                                    className="flex items-center gap-3 px-4 py-2"
                                >
                                    <FaTasks />
                                    <span>My Tasks</span>
                                </Link>
                            </li>

                            <li className="hover:bg-gray-700 cursor-pointer">
                                <Link
                                    href="/activity"
                                    className="flex items-center gap-3 px-4 py-2"
                                >
                                    <FiActivity />
                                    <span>Activity</span>
                                </Link>
                            </li>


                        </ul>
                    </nav>

                    {/* BOTTOM MENU */}
                    <nav className="space-y-3">
                        <ul className="space-y-2 ">
                            <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex items-center gap-3">
                                Settings
                            </li>
                            <li className="cursor-pointer text-red-600 hover:text-red-700 px-4">
                                Logout
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 bg-gray-100 p-10 rounded-xl">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
