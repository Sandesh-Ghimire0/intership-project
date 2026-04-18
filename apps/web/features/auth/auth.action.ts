"use server";

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(data: { email: string; password: string }) {
    try {
        const res = await axios.post(`${API_URL}/api/v1/auth/login`, data);
        console.log(res);
        const { user, accessToken } = res.data.data;

        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessToken);

        return { user, error: null };
    } catch (error: any) {
        return {
            user: null,
            error: error.response.data || "Something went wrong",
            status: error.response.status,
        };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    try {
        // Attempt to notify backend
        await fetch(`${API_URL}/api/v1/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Backend logout failed, proceeding with local cleanup");
    }

    cookieStore.delete("accessToken");
    return { success: true };
}

export async function googleLoginAction(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token);

    return { success: true };
}
