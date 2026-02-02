import React from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* NAVBAR */}
            <header className="sticky top-0 z-50 h-16 bg-white border-b flex items-center px-6">
                {/* Logo */}
                <div className="font-bold text-lg w-56">Tasks</div>

                {/* Search */}
                <div className="flex-1 px-6">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full max-w-md border rounded-lg px-3 py-1.5"
                    />
                </div>

                {/* Create Task  */}
                <Link href="/tasks?showForm=true" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create Task
                </Link> 
            </header>

            {/* BODY */}
            <div className="flex flex-1">
                {/* SIDEBAR */}
                <aside className="sticky top-16 h-[calc(100vh-4rem)] w-56 bg-gray-50 border-r flex flex-col justify-between px-4 py-6">
                    {/* TOP MENU */}
                    <nav className="space-y-3">
                        <p className="text-sm font-semibold text-gray-500 uppercase">
                            Main
                        </p>

                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="cursor-pointer hover:text-blue-600"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/tasks"
                                    className="cursor-pointer hover:text-blue-600"
                                >
                                    Tasks
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-tasks"
                                    className="cursor-pointer hover:text-blue-600"
                                >
                                    My Tasks
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/activity"
                                    className="cursor-pointer hover:text-blue-600"
                                >
                                    Activity
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* BOTTOM MENU */}
                    <nav className="space-y-3">
                        <ul className="space-y-2">
                            <li className="cursor-pointer hover:text-blue-600">
                                Settings
                            </li>
                            <li className="cursor-pointer text-red-600 hover:text-red-700">
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
