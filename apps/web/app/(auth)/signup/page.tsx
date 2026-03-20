import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signup = () => {
    return (
        <div className="flex min-h-screen bg-white font-sans">
            <div className="lg:flex flex-1 relative">
                <Image
                    src="/signup.jpg"
                    alt="login form graphic illustrations"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex flex-col justify-center flex-1">
                <div className="max-w-lg w-full  mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Create New Account
                    </h2>

                    <form className="space-y-5 mt-5">
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
                                placeholder="Description of role"
                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />
                        </div>

                        <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-600 mt-8">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
