"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { googleLoginAction } from "../auth.action";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { fetchMyData } from "../auth.api";

const AuthCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { login } = useAuthStore();

    const handleLogin = async () => {
        const token = searchParams.get("token");
        try {
            const res = await fetchMyData();
            if (token) {
                googleLoginAction(token).then(() => {
                    if (res?.status === 200) login(res.data.data);
                    router.push("/dashboard");
                });
            }
        } catch (error) {
            console.log("Google login failed :: ", error);
        }
    };

    useEffect(() => {
        handleLogin();
    }, [searchParams, router]);
    return <div>Finishing secure Login -......</div>;
};

export default AuthCallback;
