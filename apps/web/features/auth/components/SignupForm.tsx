"use client";

import React, { FormEvent, useState } from "react";
import { signupUser } from "../auth.api";
import { useRouter } from "next/navigation";

const SignupForm = () => {
    const router = useRouter();

    const [existMsg, setExistMsg] = useState({ username: "", email: "" });
    const [passError, setPassError] = useState('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        if(data.oldPassword !== data.password){
            setPassError("passwords do not match")
            return 
        }

        delete data.oldPassword
        setPassError("")

        try {
            const result = await signupUser(data);
            if (result.success) {
                router.replace("/login");
            } else if (result.status === 409) {
                if (result.error.message === "username already exist") {
                    setExistMsg({
                        username: "Username already exist",
                        email: "",
                    });
                } else if (result.error.message === "email already exist") {
                    setExistMsg({ email: "Email already exist", username: "" });
                }
            }
        } catch (error) {
            console.log("Sign up failed : ", error);
        }
    };

    return (
        <div className="w-full">
            <header className="mb-10 lg:mb-8">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase mb-2">Create Account</h2>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label
                            htmlFor="fullname"
                            className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                        >
                            Username
                        </label>
                        <input
                            id="fullname"
                            name="username"
                            minLength={3}
                            maxLength={30}
                            type="text"
                            className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors mt-1.5"
                            required
                        />
                        {existMsg.username && (
                            <p className="text-red-600 text-[11px] font-bold uppercase mt-1">
                                {existMsg.username}
                            </p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors mt-1.5"
                            required
                        />
                        {existMsg.email && (
                            <p className="text-red-600 text-[11px] font-bold uppercase mt-1">
                                {existMsg.email}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            minLength={7}
                            maxLength={20}
                            className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors mt-1.5"
                            required
                        />
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                            Min 7 characters
                        </p>
                    </div>

                    <div className="flex-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            minLength={7}
                            maxLength={20}
                            className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors mt-1.5"
                            required
                        />
                        {passError && <p className="text-[11px] text-red-400 font-bold uppercase mt-1">{passError}</p> }
                    </div>
                </div>

                <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Job Role
                    </label>
                    <select
                        name="role"
                        className="w-full border border-slate-200 text-slate-900 text-sm px-4 py-3 bg-white rounded-none focus:outline-none focus:border-blue-600 appearance-none mt-1.5"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="frontend_developer">Frontend Developer</option>
                        <option value="backend_developer">Backend Developer</option>
                        <option value="fullstack_developer">Full Stack Developer</option>
                        <option value="ui_ux_designer">UI/UX Designer</option>
                        <option value="devops_engineer">DevOps Engineer</option>
                        <option value="qa_engineer">QA Engineer</option>
                        <option value="data_scientist">Data Scientist</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="mobile_developer">Mobile App Developer</option>
                        <option value="cloud_architect">Cloud Architect</option>
                    </select>
                </div>

                <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Professional Description
                    </label>
                    <textarea
                        rows={3}
                        name="description"
                        minLength={3}
                        maxLength={100}
                        placeholder="Brief overview of your focus area..."
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-none focus:outline-none focus:border-blue-600 transition-colors mt-1.5 resize-none"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-linear-to-br from-blue-600 to-blue-800 text-white py-4 font-bold text-sm uppercase tracking-widest active:scale-[0.99] transition-all hover:shadow-lg hover:shadow-blue-100"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
