"use client";

import { useTransition } from "react";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { useRouter } from "next/navigation";
import { logoutAction } from "../actions/auth.action";

const Logout = () => {
    const { logout } = useAuthStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            try {
                const success = await logoutAction();
                if (success) {
                    logout();
                    router.push("/login");
                }
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
