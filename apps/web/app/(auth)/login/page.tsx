import LoginForm from "@/features/auth/components/LoginForm";
import Link from "next/link";

const Login = () => {
    return (
        <div className="flex h-screen bg-[#f7f9fb] overflow-hidden">
            {/* Left Side: Branding / Illustration Area (Blue Toned) */}
            <section className="hidden lg:flex lg:w-1/2 h-full bg-[#0048c1] flex-col justify-between p-12 relative overflow-hidden">
                {/* Background Texture for 'Architect' Aesthetic */}
                <div 
                    className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                        backgroundSize: '24px 24px' 
                    }}
                ></div>

                <div className="relative z-10">
                    <span className="text-sm font-black tracking-[0.2em] text-white uppercase">Task Manager</span>
                </div>

                <div className="relative z-10 space-y-6">
                    <h1 className="text-5xl font-extrabold tracking-tighter text-white leading-none max-w-md">
                        ELIMINATE THE COLLABORATION GAP.
                    </h1>
                    <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                        Streamline your workflow with our intuitive task management platform. Track progress, manage deadlines, and collaborate seamlessly with your team.
                    </p>
                </div>

                <div className="relative z-10 flex gap-12">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Latency</span>
                        <span className="text-white  text-lg">0.02ms</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Uptime</span>
                        <span className="text-white  text-lg">99.99%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Data Integrity</span>
                        <span className="text-white  text-lg">100%</span>
                    </div>
                </div>

                {/* Decorative Layer */}
                <div className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-20 mix-blend-overlay pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-tl from-white/20 to-transparent"></div>
                </div>
            </section>

            {/* Right Side: Login Form */}
            <section className="w-full lg:w-1/2 h-full min-h-screen bg-white flex flex-col items-center justify-center p-8 md:p-16 relative">
                <div className="w-full max-w-[400px] flex flex-col">
                    <LoginForm />

                    <footer className="mt-12 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-600 font-bold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </footer>
                </div>

                {/* Global Footer Token (Fixed at bottom of right side on mobile, or bottom of page) */}
                <div className="absolute bottom-0 left-0 w-full bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex flex-col md:flex-row justify-between items-center px-8 py-3 gap-2">
                    <div className="text-slate-400 font-bold text-[9px] tracking-wider uppercase">
                        © 2026 ARCHITECT_OS. ALL RIGHTS RESERVED.
                    </div>
                    <nav className="flex gap-4">
                        <Link href="#" className="text-slate-400 text-[9px] font-bold tracking-widest uppercase hover:text-blue-600 transition-colors">Privacy</Link>
                        <Link href="#" className="text-slate-400 text-[9px] font-bold tracking-widest uppercase hover:text-blue-600 transition-colors">Terms</Link>
                        <Link href="#" className="text-slate-400 text-[9px] font-bold tracking-widest uppercase hover:text-blue-600 transition-colors">Security</Link>
                    </nav>
                </div>
            </section>
        </div>
    );
};

export default Login;
