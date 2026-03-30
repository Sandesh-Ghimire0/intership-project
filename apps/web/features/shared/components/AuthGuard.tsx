"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, hasHydrated } = useAuthStore();

    const router = useRouter();

    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // only check user when zustand state is hydrated
        if (hasHydrated && !user) {
            router.replace("/login");
        } else {
            setIsVerified(true);
        }
    }, [user, hasHydrated]);

    if (!isVerified) {
        return (
            <div className="flex text-2xl font-bold h-screen w-full items-center justify-center">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
