"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(data: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Login failed");

    const json = await res.json();
    const { user, accessToken } = json.data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken);

    return { user };
}
