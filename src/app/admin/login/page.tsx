"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Sample credentials
    const SAMPLE_EMAIL = "admin@siaptenang.id";
    const SAMPLE_PASSWORD = "admin123";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            if (email === SAMPLE_EMAIL && password === SAMPLE_PASSWORD) {
                localStorage.setItem("admin_auth", "true");
                router.push("/admin");
            } else {
                setError("Email atau password yang Anda masukkan salah.");
                setIsLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#FBF8F4] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-800 text-white mb-6 shadow-xl shadow-stone-900/10 ring-4 ring-white">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Admin<span className="text-amber-700">Panel</span></h1>
                    <p className="text-stone-500 mt-2 font-medium">Silakan masuk untuk mengelola dashboard Anda.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border-2 border-stone-100 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-stone-200/60 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-amber-800" />

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-amber-700 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@siaptenang.id"
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-50 rounded-2xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-stone-800 font-medium placeholder:text-stone-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-amber-700 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-50 rounded-2xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-stone-800 font-medium placeholder:text-stone-300"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold animate-in shake duration-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-stone-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={22} />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Hint Section */}
                    <div className="mt-8 pt-6 border-t border-stone-50">
                        <p className="text-xs text-stone-400 text-center leading-relaxed">
                            <span className="block font-bold mb-1">Demo Access:</span>
                            admin@siaptenang.id / admin123
                        </p>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <button onClick={() => router.push("/")} className="text-sm font-bold text-stone-400 hover:text-amber-800 transition-colors flex items-center justify-center gap-2 mx-auto">
                        Back to Landing Page
                    </button>
                </div>
            </div>
        </div>
    );
}
