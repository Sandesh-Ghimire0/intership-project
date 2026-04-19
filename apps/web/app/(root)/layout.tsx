"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthGuard from "@/features/shared/components/AuthGuard";
import SocketProvider from "@/features/shared/components/SocketProvider";
import Logout from "@/features/auth/components/Logout";
import Sidebar from "@/features/shared/components/Sidebar";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { GrTask } from "react-icons/gr";
import SearchBar from "@/features/search/SearchBar";
import AssistantToggle from "@/features/assistant/components/AssistantToggle";
import AssistantDrawer from "@/features/assistant/components/AssistantDrawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-white text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ── MOBILE SIDEBAR (DRAWER) ── */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
                {/* Panel */}
                <aside className={`
                    absolute inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center shrink-0">
                                <GrTask className="text-white" size={14} />
                            </div>
                            <span className="font-bold text-[16px] tracking-tight text-slate-900">
                                Tasks App
                            </span>
                        </div>
                        <button 
                            className="p-1 text-slate-500 hover:bg-slate-50 rounded"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                    <Sidebar onItemClick={() => setIsSidebarOpen(false)} />
                    <div className="border-t border-slate-200 py-3">
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 mx-3 rounded text-[14px] font-medium text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </Link>
                        <Logout />
                    </div>
                </aside>
            </div>

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 sticky top-0 h-screen flex-col shrink-0">
                <div className="px-6 py-5 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center shrink-0">
                            <GrTask className="text-white" size={14} />
                        </div>
                        <span className="font-bold text-[16px] tracking-tight text-slate-900">
                            Tasks App
                        </span>
                    </div>
                </div>
                <Sidebar />
                <div className="border-t border-slate-200 py-3">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-2 mx-3 rounded text-[14px] font-medium text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all duration-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </Link>
                    <Logout />
                </div>
            </aside>

            {/* ── CONTENT WRAPPER ── */}
            <div className="flex flex-col flex-1 min-h-screen min-w-0">

                {/* NAVBAR */}
                <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 bg-white sticky top-0 z-40">

                    <div className="flex items-center gap-3">
                        <button 
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FiMenu size={20} />
                        </button>
                        
                        <div className="hidden sm:block md:w-80">
                            <SearchBar />
                        </div>
                    </div>

                    <div className="sm:hidden flex-1 px-2">
                         <SearchBar />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                        <Link href="/activity/my" className="text-slate-400 hover:text-slate-600 transition-colors p-2">
                            <FiBell size={18} />
                        </Link>
                        <div className="h-5 w-px bg-slate-200 hidden sm:block" />
                        <AssistantToggle />
                    </div>
                </header>

                {/* MAIN */}
                <AuthGuard>
                    <SocketProvider>
                        <main className="flex-1 bg-slate-50 p-4 sm:p-6 md:p-8 overflow-x-hidden">
                            {children}
                        </main>
                        <AssistantDrawer />
                    </SocketProvider>
                </AuthGuard>
            </div>
        </div>
    );
};


export default Layout;
