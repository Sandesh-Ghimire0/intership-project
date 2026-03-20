import SignupForm from "@/features/auth/components/SignupForm";
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

                    <SignupForm />

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
