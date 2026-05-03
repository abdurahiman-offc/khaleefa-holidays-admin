
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, User, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                router.push("/destinations");
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#18189C]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#18189C]/5 rounded-full blur-3xl" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 relative z-10 border-[10px] border-white"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-[#18189C] to-black rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl transform -rotate-12">
                        <span className="text-white text-3xl font-black italic">K</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Admin Portal</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Khaleefa Holidays Dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 focus:border-[#18189C] outline-none transition font-bold text-slate-900"
                                placeholder="admin"
                                required
                            />
                        </div>
                    </div>
 
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 focus:border-[#18189C] outline-none transition font-bold text-slate-900"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative group w-full pt-4">
                        <div className="absolute -inset-1 bg-black rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full bg-gradient-to-r from-[#18189C] to-black text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl border-2 border-black transition duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-xs"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Secure Login"
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
