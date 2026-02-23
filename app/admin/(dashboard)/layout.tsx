"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, Map, Files, Hotel, Car, MessageSquare, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800 hover:text-white";
    };

    // Close sidebar on navigation (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: "Destinations", href: "/admin/destinations", icon: Map },
        { name: "Visas", href: "/admin/visas", icon: Files },
        { name: "Rooms", href: "/admin/rooms", icon: Hotel },
        { name: "Cabs", href: "/admin/cabs", icon: Car },
        { name: "Submissions", href: "/admin/submissions", icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutDashboard size={24} className="text-blue-400" />
                        Admin
                    </h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive(link.href)}`}
                        >
                            <link.icon size={18} />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 text-white z-[110] md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-slate-800">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <LayoutDashboard size={24} className="text-blue-400" />
                                    Admin
                                </h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 hover:bg-slate-800 rounded-full transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="mt-8 px-4 space-y-2 flex-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold text-lg ${isActive(link.href)}`}
                                    >
                                        <link.icon size={22} />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="p-6 border-t border-slate-800">
                                <form action="/api/auth/logout" method="POST">
                                    <button type="submit" className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-500/10 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 transition">
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow z-10">
                    <div className="px-4 md:px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition text-slate-600"
                            >
                                <Menu size={24} />
                            </button>
                            <h3 className="text-lg font-bold text-slate-800">
                                {navLinks.find(l => pathname.startsWith(l.href))?.name || "Dashboard"}
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">
                                    Admin Active
                                </span>
                            </div>
                            <form action="/api/auth/logout" method="POST" className="hidden sm:block">
                                <button type="submit" className="text-sm text-red-600 hover:text-red-700 font-bold border border-red-100 px-4 py-2 rounded-xl hover:bg-red-50 transition active:scale-95">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
