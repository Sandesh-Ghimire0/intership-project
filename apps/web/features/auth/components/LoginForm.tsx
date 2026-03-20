"use client";

import { FormEvent } from "react";
import { loginUser } from "../api/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/shared/store/useAuthStore";

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuthStore();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        try {
            const res = await loginUser(data as any);
            if (res?.status === 200) {
                const { user, accessToken } = res.data.data;
                login(user, accessToken);
                router.replace("/dashboard");
            }
        } catch (error) {
            console.log("Error while loggin user", error);
        }
    };
    return (
        <form onSubmit={onSubmit} className="space-y-5 mt-5">
            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Your work email"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
                />
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
