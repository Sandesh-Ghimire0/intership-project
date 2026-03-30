"use client"

import React from 'react'
import { usePathname } from 'next/navigation';
import { MdDashboard } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();

  // Define links in an array to keep the code DRY
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
    { name: "Tasks", href: "/tasks", icon: <GrTasks /> },
    { name: "My Tasks", href: "/my-tasks", icon: <FaTasks /> },
    { name: "Activity", href: "/activity/my", icon: <FiActivity /> },
  ];

  return (
    <nav className="space-y-3">
      <ul className="space-y-2 mt-3">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li 
              key={link.href} 
              className={`cursor-pointer transition-colors ${
                isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <Link href={link.href} className="flex items-center gap-3 px-4 py-2">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar