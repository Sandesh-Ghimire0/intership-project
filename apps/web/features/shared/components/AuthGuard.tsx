"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { accessToken, hasHydrated } = useAuthStore();

    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // only check accessToken when zustand state is hydrated
        if (hasHydrated && !accessToken) {
            router.replace("/login");
        } else {
            setIsVerified(true);
        }
    }, [accessToken, hasHydrated]);

    if (!isVerified) {
        return (
            <div className="flex text-2xl font-bold h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
