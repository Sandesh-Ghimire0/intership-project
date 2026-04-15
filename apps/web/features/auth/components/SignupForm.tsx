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
        <form onSubmit={onSubmit} className="space-y-5 mt-5">
            <div className="flex gap-3">
                <div>
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
                            minLength={3}
                            maxLength={30}
                            type="text"
                            placeholder="Create a username"
                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            required
                        />
                    </div>
                    <div>
                        {existMsg.username && (
                            <span className="text-red-600">
                                {existMsg.username}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your work email"
                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            required
                        />
                    </div>
                    <div>
                        {existMsg.email && (
                            <span className="text-red-600">
                                {existMsg.email}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex gap-3">
                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            minLength={7}
                            maxLength={20}
                            placeholder="Create a password"
                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            required
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            Must be at least 7 characters
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            minLength={7}
                            maxLength={20}
                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            required
                        />
                        {passError && <p className="text-xs text-red-400 mt-2">{passError}</p> }
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 appearance-none"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select your role
                        </option>
                        <option value="frontend_developer">
                            Frontend Developer
                        </option>
                        <option value="backend_developer">
                            Backend Developer
                        </option>
                        <option value="fullstack_developer">
                            Full Stack Developer
                        </option>
                        <option value="ui_ux_designer">UI/UX Designer</option>
                        <option value="devops_engineer">DevOps Engineer</option>
                        <option value="qa_engineer">QA Engineer</option>
                        <option value="data_scientist">Data Scientist</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="mobile_developer">
                            Mobile App Developer
                        </option>
                        <option value="cloud_architect">Cloud Architect</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Description
                </label>
                <textarea
                    rows={5}
                    name="description"
                    minLength={3}
                    maxLength={100}
                    placeholder="Description of your role"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                />
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4">
                Create Account
            </button>
        </form>
    );
};

export default SignupForm;
