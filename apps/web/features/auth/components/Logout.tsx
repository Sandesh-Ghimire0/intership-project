"use client";

import { useTransition } from "react";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { useRouter } from "next/navigation";
import { logoutAction } from "../auth.action";
import { FiLogOut } from "react-icons/fi";

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
        <button
            onClick={handleLogout}
            disabled={isPending}
            className={`flex items-center gap-3 px-3 py-2 mx-3 rounded text-[14px] font-medium w-[calc(100%-24px)] transition-all duration-100 ${
                isPending
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-red-500 hover:bg-red-50"
            }`}
        >
            <FiLogOut size={17} />
            {isPending ? "Logging out..." : "Logout"}
        </button>
    );
};

export default Logout;
