import { User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="pt-10">
            {/* Header */}
           <div className="flex justify-between mb-8">
             <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Activity Log
                </h1>
                <p className="text-gray-500 text-sm">
                    Track the latest changes in your project
                </p>
            </div>
            <div className="flex items-center">
                <Link
                    href="/activity/my"
                    className="border border-blue-600 px-3 py-2 rounded-l-full"
                >
                    <User color="blue" size={20} />
                </Link>
                <Link
                    href="/activity/all"
                    className="border border-blue-600 border-l-0 rounded-r-full px-3 py-2"
                >
                    <Users color="blue" size={20} />
                </Link>
            </div>
           </div>
            {children}
        </div>
    );
};

export default Layout;
