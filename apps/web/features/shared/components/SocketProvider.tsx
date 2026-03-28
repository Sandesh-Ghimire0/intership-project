"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getSocket } from "@/app/socket";
import { useActivityStore } from "../store/useActivityStore";
import { IActivity } from "../types/type";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    const socket = getSocket();

    const { addActivity, addMyActivity } = useActivityStore();

    const handleActivity = (data: IActivity) => {
        if (
            data.userId._id === user?._id ||
            data.receiverId.some((r) => r._id === user?._id)
        ) {
            addMyActivity(data);
        }
        addActivity(data);
    };

    useEffect(() => {
        if (!user) return;

        if (!socket.connected) {
            socket.connect();
        }

        socket.on("activity", handleActivity);

        return () => {
            socket.off("activity", handleActivity);
            socket.disconnect();
        };
    }, [user]);

    return <>{children}</>;
};

export default SocketProvider;
