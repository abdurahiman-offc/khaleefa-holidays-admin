"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Plane, Users, Calendar, Phone, MessageSquare, Trash2, Search } from "lucide-react";

interface Submission {
    _id: string;
    type: "Contact" | "Destination" | "B2B";
    name: string;
    phone: string;
    message: string;
    destinationName?: string;
    createdAt: string;
}

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"All" | "Contact" | "Destination" | "B2B">("All");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSubmissions = async () => {
        try {
            const res = await fetch("/api/submissions");
            const data = await res.json();
            if (data.success) {
                setSubmissions(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const filteredSubmissions = submissions
        .filter((s) => filter === "All" || s.type === filter)
        .filter((s) => {
            const query = searchQuery.toLowerCase();
            return s.name.toLowerCase().includes(query) ||
                s.phone.toLowerCase().includes(query) ||
                s.message.toLowerCase().includes(query) ||
                (s.destinationName || "").toLowerCase().includes(query);
        });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Contact": return <Mail size={16} className="text-blue-500" />;
            case "Destination": return <Plane size={16} className="text-green-500" />;
            case "B2B": return <Users size={16} className="text-purple-500" />;
            default: return <MessageSquare size={16} className="text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Form Submissions</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, phone, message..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                            {["All", "Contact", "Destination", "B2B"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t as any)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === t
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        {submissions.length > 0 && (
                            <button
                                onClick={async () => {
                                    if (confirm("Are you sure you want to clear ALL submissions? This cannot be undone.")) {
                                        setLoading(true);
                                        await fetch("/api/submissions", { method: "DELETE" });
                                        fetchSubmissions();
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm font-bold transition-all border border-red-100"
                            >
                                <Trash2 size={16} />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Passenger / Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Enquiry Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSubmissions.map((sub) => (
                                <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-2 rounded-lg ${sub.type === "Contact" ? "bg-blue-50" :
                                                sub.type === "Destination" ? "bg-green-50" : "bg-purple-50"
                                                }`}>
                                                {getTypeIcon(sub.type)}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{sub.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                <Users size={14} className="text-gray-400" /> {sub.name}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                                                <Phone size={12} className="text-gray-400" /> {sub.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            {sub.destinationName && (
                                                <div className="mb-2">
                                                    <span className="px-2 py-0.5 bg-[#0A0E17] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                        {sub.destinationName}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                {sub.message}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={async () => {
                                                if (confirm("Delete this submission?")) {
                                                    await fetch(`/api/submissions?id=${sub._id}`, { method: "DELETE" });
                                                    fetchSubmissions();
                                                }
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSubmissions.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="text-gray-300" size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">No submissions found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
