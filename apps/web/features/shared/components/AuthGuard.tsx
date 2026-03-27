"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { getSocket } from "@/app/socket";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, hasHydrated } = useAuthStore();

    const router = useRouter();

    const socket = getSocket();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // only check user when zustand state is hydrated
        if (hasHydrated && !user) {
            router.replace("/login");
        } else {
            setIsVerified(true);
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [user, hasHydrated]);

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
