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
        <>
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

            <div className="w-full mt-4 space-y-4">
                {/* Horizontal "OR" Separator */}
                <div className="relative flex items-center">
                    <div className="grow border-t border-gray-300"></div>
                    <span className="shrink mx-4 text-gray-400 text-sm uppercase tracking-wider">
                        Or
                    </span>
                    <div className="grow border-t border-gray-300"></div>
                </div>

                {/* Google Login Link */}
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`}
                    className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-md bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                >
                    {/* Official Google SVG Icon */}
                    <svg
                        className="w-5 h-5 mr-3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span>Continue with Google</span>
                </a>
            </div>
        </>
    );
};

export default LoginForm;
