"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FiActivity, FiSettings } from "react-icons/fi";

const NAV_LINKS = [
    { name: "Dashboard",  href: "/dashboard",    icon: <MdDashboard size={18} /> },
    { name: "Tasks",      href: "/tasks",         icon: <GrTasks size={17} /> },
    { name: "My Tasks",   href: "/my-tasks",      icon: <FaTasks size={17} /> },
    { name: "Activity",   href: "/activity/my",   icon: <FiActivity size={17} /> },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex-1 py-2">
            <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2 mx-3 rounded text-[14px] font-medium transition-all duration-100 ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                                }`}
                            >
                                <span className={isActive ? "text-blue-600" : "text-slate-400"}>
                                    {link.icon}
                                </span>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Sidebar;