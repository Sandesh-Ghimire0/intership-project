import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
    return (
        <div className="flex min-h-screen bg-white font-sans">
            <div className="flex flex-col justify-center flex-1">
                <div className="max-w-sm w-full  mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Login to Task Manager
                    </h2>

                    <LoginForm />

                    <p className="text-center text-sm text-slate-600 mt-8">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <div className="lg:flex flex-1 relative bg-blue-200">
                <Image
                    src="/login.jpg"
                    alt="login form graphic illustrations"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
        </div>
    );
};

export default Login;
