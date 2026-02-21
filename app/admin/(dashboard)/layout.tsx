"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800 hover:text-white";
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link href="/admin/destinations" className={`block px-4 py-2 rounded transition ${isActive("/admin/destinations")}`}>
                        Destinations
                    </Link>

                    <Link href="/admin/visas" className={`block px-4 py-2 rounded transition ${isActive("/admin/visas")}`}>
                        Visas
                    </Link>
                    <Link href="/admin/rooms" className={`block px-4 py-2 rounded transition ${isActive("/admin/rooms")}`}>
                        Rooms
                    </Link>
                    <Link href="/admin/cabs" className={`block px-4 py-2 rounded transition ${isActive("/admin/cabs")}`}>
                        Cabs
                    </Link>
                    <Link href="/admin/submissions" className={`block px-4 py-2 rounded transition ${isActive("/admin/submissions")}`}>
                        Submissions
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">Dashboard</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                Admin
                            </span>
                            <form action="/api/auth/logout" method="POST">
                                <button type="submit" className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
