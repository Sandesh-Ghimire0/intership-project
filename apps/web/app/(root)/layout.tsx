import React from "react";
import Link from "next/link";

import AuthGuard from "@/features/shared/components/AuthGuard";
import SocketProvider from "@/features/shared/components/SocketProvider";
import Logout from "@/features/auth/components/Logout";
import Sidebar from "@/features/shared/components/Sidebar";

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
                    href="/my-tasks?create=true"
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
                    <Sidebar />

                    {/* BOTTOM MENU */}
                    <nav className="space-y-3">
                        <ul className="space-y-2 ">
                            <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex items-center gap-3">
                                Settings
                            </li>
                            <Logout />
                        </ul>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <AuthGuard>
                    <SocketProvider>
                        <main className="flex-1 bg-gray-100 p-10 rounded-xl">
                            {children}
                        </main>
                    </SocketProvider>
                </AuthGuard>
            </div>
        </div>
    );
};

export default Layout;
