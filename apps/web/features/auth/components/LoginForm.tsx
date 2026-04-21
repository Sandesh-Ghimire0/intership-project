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

            const result = await loginAction(data as any);

            if (result.error) {
                if (result.status === 401) {
                    setErrMsg("Invalid email or password. Please try again.");
                } else {
                    setErrMsg(result.error);
                }
            } else {
                login(result.user);
                router.replace("/dashboard");
            }
        });
    };
    return (
        <div className="w-full">
            <header className="mb-10">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase mb-2">
                    Login
                </h2>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label
                        className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                        htmlFor="email"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@exp.com"
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label
                            className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        minLength={7}
                        maxLength={20}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                        required
                    />
                </div>

                {errMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-none text-[12px] font-bold uppercase tracking-wider">
                        {errMsg}
                    </div>
                )}

                {/* Primary Action */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full bg-linear-to-br from-blue-600 to-blue-800 text-white py-4 font-bold text-sm uppercase tracking-widest active:scale-[0.99] transition-all ${
                        isPending
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:shadow-lg hover:shadow-blue-100"
                    }`}
                >
                    {isPending ? "Authenticating..." : "Login"}
                </button>

                {/* Divider */}
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                        <span className="bg-white px-4 text-slate-400">or</span>
                    </div>
                </div>

                {/* Google Action */}
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`}
                    className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white py-4 text-slate-900 text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-none"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        ></path>
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        ></path>
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05"
                        ></path>
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        ></path>
                    </svg>
                    Continue with Google
                </a>
            </form>
        </div>
    );
};

export default LoginForm;
