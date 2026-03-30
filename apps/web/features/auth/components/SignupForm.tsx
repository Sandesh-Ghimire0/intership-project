"use client";

import React, { FormEvent } from "react";
import { signupUser } from "../auth.api";
import { useRouter } from "next/navigation";

const SignupForm = () => {
    const router = useRouter();
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await signupUser(data);
            if (res?.status === 201) {
                router.replace("/login");
            }
        } catch (error) {
            console.log("Error while submitting signup form: ", error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5 mt-5">
            <div className="flex gap-3">
                <div>
                    <label
                        htmlFor="fullname"
                        className="block text-sm font-semibold text-slate-800 mb-1"
                    >
                        Name
                    </label>
                    <input
                        id="fullname"
                        name="username"
                        type="text"
                        placeholder="Your full name"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your work email"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                        Password
                    </label>
                    <input
                        type="text"
                        name="password"
                        placeholder="Create a password"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                        Must be at least 7 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                        Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        placeholder="Your role at work"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Description
                </label>
                <textarea
                    rows={5}
                    name="description"
                    placeholder="Description of role"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4">
                Create Account
            </button>
        </form>
    );
};

export default SignupForm;
