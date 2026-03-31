"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/shared/store/useAuthStore";
import { loginAction } from "../auth.action";

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuthStore();

    const [errMsg, setErrMsg] = useState("");
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        startTransition(async () => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);

            try {
                const result = await loginAction(data as any);

                if (result.error) {
                    if (result.status === 401) {
                        setErrMsg(
                            "Invalid email or password. Please try again.",
                        );
                    } else {
                        setErrMsg(result.error);
                    }
                } else {
                    login(result.user);
                    router.replace("/dashboard");
                }
            } catch (error: any) {
                console.log("Error while logging user", error);
            }
        });
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
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    minLength={7}
                    maxLength={20}
                    placeholder="Enter password"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
                    required
                />
            </div>

            {errMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
                    {errMsg}
                </div>
            )}

            <button
                className={`w-full bg-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4 ${
                    isPending
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-white"
                }`}
            >
                {isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;
