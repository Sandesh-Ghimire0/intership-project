"use client";

import { useTransition } from "react";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { useRouter } from "next/navigation";
import { logoutAction } from "../actions/auth.action";

const Logout = () => {
    const { logout: clearStore } = useAuthStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            try {
                // 1. Run the Server Action (Clears cookies & hits backend)
                await logoutAction();

                // 2. Clear the local Zustand/Auth store
                clearStore();

                // 3. Refresh or redirect the user
                router.push("/login");
            } catch (error) {
                console.error("Failed to logout:", error);
            }
        });
    };

    return (
        <li 
            onClick={handleLogout}
            className={`cursor-pointer px-4 ${
                isPending 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-red-600 hover:text-red-700"
            }`}
        >
            {isPending ? "Logging out..." : "Logout"}
        </li>
    );
};

export default Logout;